const mockCopy = jest.fn()
jest.mock('../lib/copy', () => mockCopy)
const mockIsValidTarget = jest.fn()
jest.mock('../lib/is-valid-target', () => mockIsValidTarget)
const mockParseArgs = jest.fn()
jest.mock('../lib/parse-args', () => mockParseArgs)

const loader = require('../lib/loader')
const { sep } = require('path')

describe('Loader', () => {
  const args = {}
  const source = 'SOURCE'
  const destination = 'DESTINATION'
  let consoleLog

  beforeAll(() => {
    consoleLog = global.console.log
    global.console.log = jest.fn()
  })

  afterAll(() => {
    global.console.log = consoleLog
  })

  beforeEach(() => {
    mockCopy.mockReset()
    mockIsValidTarget.mockReset()
    mockParseArgs.mockReset()

    mockCopy.mockResolvedValue(null)
    mockIsValidTarget.mockResolvedValue(null)
    mockParseArgs.mockReturnValue({
      _: ['dir', source, destination],
      install: true
    })
  })

  it('rejects if source is not specified', () => {
    mockParseArgs.mockReturnValue({ _: ['dir'] })
    return expect(loader.execute(args))
      .rejects.toThrow('failed to load: source is not specified')
  })

  it('rejects if destination is not specified', () => {
    mockParseArgs.mockReturnValue({ _: ['dir', sep] })
    return expect(loader.execute(args))
      .rejects.toThrow('failed to load: destination is not specified')
  })

  it('validates destination given in arguments', () => {
    return loader.execute(args)
      .then(() => {
        expect(mockIsValidTarget).toHaveBeenCalledTimes(1)
        expect(mockIsValidTarget).toHaveBeenCalledWith(destination)
      })
  })

  it('validates destination extracted from source', () => {
    mockParseArgs.mockReturnValue({ _: ['dir', source] })
    return loader.execute(args)
      .then(() => {
        expect(mockIsValidTarget).toHaveBeenCalledTimes(1)
        expect(mockIsValidTarget).toHaveBeenCalledWith(source)
      })
  })

  it('resolves with the object containing setup path and install flag', () => {
    return expect(loader.execute(args))
      .resolves.toEqual({ path: destination, install: true })
  })

  it('rejects if isValidTarget() rejects', () => {
    const err = 'validation error'
    mockIsValidTarget.mockRejectedValue(new Error(err))
    return expect(loader.execute(args))
      .rejects.toThrow(`failed to load source because of '${err}'`)
  })

  it('calls to copy when everything is valid', () => {
    return loader.execute(args)
      .then(() => {
        expect(mockCopy).toHaveBeenCalledTimes(1)
        expect(mockCopy).toHaveBeenCalledWith(source, destination)
      })
  })

  it('rejects if copy rejects', () => {
    const err = 'failed'
    mockCopy.mockRejectedValue(new Error(err))
    return expect(loader.execute(args))
      .rejects.toThrow(`failed to load source because of '${err}'`)
  })
})
