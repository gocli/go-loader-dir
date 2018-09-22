const mockNcp = jest.fn()
jest.mock('ncp', () => ({ ncp: mockNcp }))

const copy = require('../lib/copy')

describe('Copy', () => {
  const source = 'SOURCE'
  const destination = 'DESTINATION'

  beforeEach(() => {
    mockNcp.mockReset()
    mockNcp.mockImplementation((s, d, cb) => cb())
  })

  it('calls to ncp', () => {
    return copy(source, destination)
      .then(() => {
        expect(mockNcp).toHaveBeenCalledTimes(1)
        expect(mockNcp.mock.calls[0].slice(0, 2)).toEqual([source, destination])
      })
  })

  it('resolves if ncp didn\'t report an error', () => {
    return expect(copy(source, destination)).resolves.toBe(undefined)
  })

  it('rejects if ncp report an error', () => {
    const err = 'ncp failed as'
    mockNcp.mockImplementation((s, d, cb) => cb(new Error(err)))
    return expect(copy(source, destination)).rejects.toThrowError(err)
  })
})
