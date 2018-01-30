'use strict'

import bel from 'bel'
import Alert from 'components/alert'
import Button from 'components/button'

import breadcrumb from 'components/breadcrumb'
import ws from 'utils/websocket'

export default function (err, state) {
  breadcrumb.disable()

  const message = `
  The mapping has been saved to: <code>${state.success}</code>
  Note that to run <i>Stratum</i> with this mapping <b data-color="yellow">you must restart the computer.</b>
  `
  const alert = new Alert(message, {
    color: 'green',
    buttons: [
      new Button('ok', {
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
