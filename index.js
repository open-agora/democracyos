const debug = require('debug')
const config = require('lib/config')
const server = require('lib/server')
const checkNodeVersion = require('lib/check-node-version')
const migrations = require('lib/migrations')
const models = require('lib/models')()

const log = debug('democracyos:root')

// Basic server configuration
const opts = {
  port: process.env.PORT || config.publicPort,
  protocol: config.protocol,
  https: config.https
}

if (module === require.main) {
  checkNodeVersion()
    .then(models.ready())
    .then(migrations.ready())
    .then(() => {
      server(opts, function (err) {
        if (err) {
          log(err)
          process.exit(1)
          return
        }

        log('DemocracyOS server running...')
      })
    })
    .catch((err) => {
      log(err.message)
      process.exit(1)
    })
}
