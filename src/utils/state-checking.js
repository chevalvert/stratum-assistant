'use strict'

import bel from 'bel'
import Alert from 'components/alert'
import Button from 'components/button'
import grid from 'components/grid'
import breadcrumb from 'components/breadcrumb'
import keyboard from 'utils/keyboard'
import ws from 'utils/websocket'

function speak () {
  return new Promise((resolve, reject) => {
    const message = [
    'Stratum will now light up each strip individually.',
    `For each one, click <i class="fa fa-check" data-color="green"></i> if its position is correct, and <i class="fa fa-times" data-color="red"></i> if not.`
    ]

    const alert = new Alert(message, {
      color: 'yellow',
      buttons: [
      new Button('ok', {
        color: 'green',
        onclick: e => {
          e.preventDefault()
          alert.destroy()
          keyboard.off('enter')
          resolve()
        }
      })
      ]
    }).spawn()

    keyboard.once('enter', () => {
      alert.destroy()
      resolve()
    })
  })
}

export default function (state) {
  return new Promise ((resolve, reject) => {
    breadcrumb.select(2)

    grid.boxes.forEach(box => {
      box.disable()
    })

    speak().then(() => {
      let current = state.mapped.shift()
      ws.send('blackout')
      ws.send('light', {name: current.node.name, index: current.index})

      current.box.addClass('is-active')
      breadcrumb.setText(`[${current.box.position.i}; ${current.box.position.j}] ${current.node.name}#${current.index}`)

      breadcrumb.setButtons([
        new Button(`<i class='fa fa-times'></i>`, {
          color: 'red',
          onclick: e => {
            e.preventDefault()
            rejectBox()
          }
        }),
        new Button(`<i class='fa fa-check'></i>`, {
          color: 'green',
          onclick: e => {
            e.preventDefault()
            validateBox()
          }
        })
      ])

      keyboard.on('enter', () => validateBox())
      keyboard.on('return', () => rejectBox())

      function rejectBox () {
        current.box.removeClass('is-active')
        current.box.addClass('is-not-validated')
        state.mappable.push(current)
        validate()
      }

      function validateBox () {
        current.box.removeClass('is-active')
        current.box.addClass('is-validated')
        state.validated.push(current)
        validate()
      }

      function validate () {
        if (state.mapped.length) {
          current = state.mapped.shift()
          ws.send('blackout')
          ws.send('light', {name: current.node.name, index: current.index})
          current.box.addClass('is-active')
          breadcrumb.setText(`[${current.box.position.i}; ${current.box.position.j}] ${current.node.name}#${current.index}`)
        } else {
          keyboard.off('enter')
          keyboard.off('return')
          resolve(state)
        }
      }
    }).catch(err => reject(err))
  })
}
