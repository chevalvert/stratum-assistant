#!/usr/bin/env node
'use strict'

const path = require('path')
const fs = require('fs-extra')
const args = require(path.join(__dirname, 'utils', 'config.js'))

const WebServer = require(path.join(__dirname, 'utils', 'web-server'))
const web = new WebServer({
  autoOpen: args.open,
  port: 8888,
  public: path.join(__dirname, '..', 'build')
})

const hnode = require('hnode')
const hnodeServer = new hnode.Server()

// RX
web.on('blackout', () => hnodeServer.blackout())
web.on('light:all', () => hnodeServer.setAll([255, 255, 255]))
web.on('light', data => {
  const node = hnodeServer.getNodeByName(data.name)
  const color = data.color || [255, 255, 255]
  if (node) {
    node.setStrip(data.index, new Array(90).fill(color))
  }
})
web.on('save', data => {
  fs.outputJson(path.join(args.output, 'stratum.mapping.json'), { nodes: data }, { spaces: 2 }, err => {
    web.broadcast('saved', err)
  })
})
web.on('quit', () => process.exit())

// TX
web.on('client', () => {
  web.broadcast('connected', hnodeServer.getAllNodes().map(node => {
    return { ip: node.ip, name: node.name }
  }))
})

hnodeServer.on('newnode', node => {
  node.on('online', () => web.broadcast('newnode'))
})


hnodeServer.start()
