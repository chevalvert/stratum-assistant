'use strict'

import Alert from 'components/alert'
import Button from 'components/button'
import ws from 'utils/websocket'

const message = `
Stratum-assistant is in standby mode.
It usually means that <i>Stratum</i> is currently running.

To stop <i>Stratum</i> and proceed to the mapping setup, click <b data-color="red">leave&nbsp;standby&nbsp;mode</b>.
`

export default function (next) {
  ws.once('standby', isStandby => {
    if (!isStandby) {
      ws.send('end-standby')
      return next()
    }

    const alert = new Alert(message, {
      color: 'yellow',
      buttons: [
        new Button('leave standby mode', {
          color: 'red',
          onclick: e => {
            e.preventDefault()
            alert.destroy()
            ws.send('end-standby')
            next()
          }
        })
      ]
    }).spawn()
  })
}
