'use strict'

import bel from 'bel'
import Alert from 'components/alert'
import Button from 'components/button'
import breadcrumb from 'components/breadcrumb'

import keyboard from 'utils/keyboard'

export default function (state, next) {
  breadcrumb.select(0)

  const message = [
    'All strips should have turned on. Check for connectivity if not.',
    'Once all strips are properly switched on, click <b data-color="green">start&nbsp;mapping</b>.'
  ]

  const alert = new Alert(message, {
    color: 'yellow',
    buttons: [
      new Button('start mapping', {
        color: 'green',
        onclick: () => {
          alert.destroy()
          keyboard.off('enter')
          next(null, state)
        }
      })
    ]
  }).spawn()

  keyboard.once('enter', () => {
    alert.destroy()
    next(null, state)
  })
}
