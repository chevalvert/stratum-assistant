'use strict'

import bel from 'bel'
import Alert from 'components/alert'
import Button from 'components/button'
import breadcrumb from 'components/breadcrumb'
import ws from 'utils/websocket'

function say (nodes) {
  return new Promise((resolve, reject) => {
    const message = `The mapping is done.`
    const alert = new Alert(message, {
      color: 'yellow',
      buttons: [
        new Button('save', {
          color: 'green',
          onclick: () => {
            ws.on('saved', err => {
              if (err) reject(err)
              else {
                alert.destroy()
                resolve()
              }
            })
            ws.send('save', nodes)
          }
        })
      ]
    }).spawn()
  })
}

export default function (state, next) {
  breadcrumb.disable()

  /**
   * @NOTE: mapping.json is formatted as below:
   * "nodes": {
   *   "NodeName0": [[i, j], [i, j], [i, j], [i, j]],
   *   ...
   *   "NodeNameN": [[i, j], [i, j], [i, j], [i, j]]
   * }
  **/
  const nodes = {}
  state.validated.forEach(strip => {
    const name = strip.node.name
    if (!nodes[name]) nodes[name] = Array(4)
    nodes[name][strip.index] = [strip.box.position.i, strip.box.position.j]
  })

  say(nodes).then(() => {
    next(null, state)
  })
}
