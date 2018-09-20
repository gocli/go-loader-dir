const { ncp } = require('ncp')

const copy = (source, destination) => new Promise((resolve, reject) => {
  ncp.limit = 16
  ncp(source, destination, err => {
    if (err) reject(err)
    else resolve()
  })
})

module.exports = copy
