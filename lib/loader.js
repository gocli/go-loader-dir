const copy = require('./copy')
const isValidTarget = require('./is-valid-target')
const parseArgs = require('./parse-args')
const { sep } = require('path')

const loadDir = ({ args }) => {
  const argv = parseArgs(args)
  const source = argv._[1]

  if (!source) {
    return Promise.reject(new Error(`failed to load: source is not specified`))
  }

  const destination = argv._[2] || source.split(sep).slice(-1)[0]
  if (!destination) {
    return Promise.reject(new Error(`failed to load: destination is not specified`))
  }

  return isValidTarget(destination)
    .then(() => console.log(`loading ${source} to ${destination}`))
    .then(() => copy(source, destination))
    .then(() => console.log('loading completed'))
    .then(() => ({ path: destination, install: argv.install }))
    .catch((error) => {
      throw new Error(`failed to load source because of '${error.message}'`)
    })
}

module.exports.execute = loadDir
