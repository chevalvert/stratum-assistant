'use strict'

import Emitter from 'tiny-emitter'
import ReconnectingWebSocket from 'reconnectingwebsocket'

const port = 8888
const address = window.location.hostname
const ws = new ReconnectingWebSocket(`ws://${address}:${port}`)
const em = new Emitter()

let connected = false

ws.onerror = function (err) {
  connected = false
  em.emit('error', err)
}

ws.onclose = function () {
  connected = false
  em.emit('close')
}

ws.onopen = function () {
  connected = true
  em.emit('open')
}

ws.onmessage = function (message) {
  let { event, data } = JSON.parse(message.data)
  em.emit(event, data)
}

export default {
  emit: em.emit.bind(em),
  on: em.on.bind(em),
  once: em.once.bind(em),
  off: em.off.bind(em),

  get connected () { return connected },
  send: (event, data) => {
    if (connected) ws.send(JSON.stringify({ event, data }))
    else console.warn(`WS: cannot send('${event}'). Not connected`)
  }
}
