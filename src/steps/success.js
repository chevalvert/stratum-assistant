'use strict'

import bel from 'bel'
import Alert from 'components/alert'
import Button from 'components/button'

import breadcrumb from 'components/breadcrumb'
import ws from 'utils/websocket'

export default function (err, state) {
  breadcrumb.disable()

  const message = `The mapping has been saved.`
  const alert = new Alert(message, {
    color: 'green',
    buttons: [
      new Button('close', {
        color: 'green',
        onclick: () => {
          alert.destroy()
          window.close()
          ws.send('quit')
        }
      })
    ]
  }).spawn()
}
