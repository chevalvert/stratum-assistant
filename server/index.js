#!/usr/bin/env node
'use strict'

process.title = 'strtm-s'

const path = require('path')
const fs = require('fs-extra')
const args = require(path.join(__dirname, 'utils', 'config.js'))

const hnode = require('hnode')
const kill = require(path.join(__dirname, 'utils', 'kill'))

kill(process.title).then(() => {
  const WebServer = require(path.join(__dirname, 'utils', 'web-server'))
  const web = new WebServer({
    autoOpen: args.open,
    port: 8888,
    public: path.join(__dirname, '..', 'build')
  })

  const hnodeServer = new hnode.Server()
  const getNodes = () => hnodeServer.getAllNodes().map(node => ({ ip: node.ip, name: node.name }))

// RX
web.on('blackout', () => hnodeServer.blackout())
web.on('light:all', () => hnodeServer.setAll([255, 255, 255]))
web.on('light', data => {
  const node = hnodeServer.getNodeByName(data.name)
  if (!node) return
    const color = data.color || [255, 255, 255]
  node.setStrip(data.index, new Array(90).fill(color))
})
web.on('save', data => {
  fs.outputJson(args.output, { nodes: data }, { spaces: 2 }, err => {
    web.broadcast('saved', { err, filename: args.output })
  })
})
web.on('quit', () => !args.standby && process.exit())

// TX
hnodeServer.on('newnode', node => {
  web.broadcast('connected', getNodes())
})

// Connection
web.on('client', () => {
  Promise.resolve()
  .then(resolveStandby)
  .then(() => kill('stratum'))
  .then(() => !hnodeServer.isRunning ? connect() : reconnect())
  .catch(err => console.log(err))
})

function resolveStandby () {
  // when args.standby === false, web will emit 'end-standby' after front loads
  // when args.standby === true, web will emit 'end-standby' when front user decides so
  web.broadcast('standby', args.standby)
  return web.waitFor('end-standby')
}

function connect () {
  hnodeServer.start()
}

function reconnect () {
  web.broadcast('connected', getNodes())
}

})
