'use strict'

const os = require('os')
const path = require('path')
const websocket = require('ws')
const express = require('express')
const Emitter = require('tiny-emitter')
const args = require(path.join(__dirname, 'config.js'))
const opn = require('opn')
const app = express()

const defaultOpts = {
  autoOpen: true,
  port: 8888,
  public: path.join(__dirname, '..', '..', 'build')
}

module.exports = function WebServer (opts) {
  opts = Object.assign({}, defaultOpts, opts || {})
  app.use(express.static(opts.public))

  const server = app.listen(opts.port, () => {
    let address = findFirstAvailableAddress()
    opts.autoOpen && opn(`http://${address}:${opts.port}/?w=${args.width}&h=${args.height}`)
    console.log(`listenning to http://${address}:${opts.port}/?w=${args.width}&h=${args.height}`)
  })

  const em = new Emitter()
  const wss = new websocket.Server({ server })

  wss.on('connection', client => {
    client.on('message', message => {
      const json = JSON.parse(message)
      em.emit(json.event, json.data)
    })
    em.emit('client', client)
  })

  const api = {
    emit: em.emit.bind(em),
    on: em.on.bind(em),
    once: em.once.bind(em),
    off: em.off.bind(em),

    get server () { return server },
    get wss () { return wss },

    broadcast:  (event, data) => {
      wss.clients.forEach(client => {
        client.send(JSON.stringify({ event, data }))
      })
    }
  }

  return api
}

function findFirstAvailableAddress () {
  let interfaces = os.networkInterfaces()
  let addresses = []
  for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
      let address = interfaces[k][k2]
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }
  return addresses[0]
}
