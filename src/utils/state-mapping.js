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
      'Stratum will now switch on each strip individually.',
      `For each one, set its position by clicking on the grid.
      If a strip is not present in the grid, click the <i class="fa fa-trash" data-color="red"></i> button.`
    ]

    const alert = new Alert(message, {
      color: 'yellow',
      buttons: [
        new Button('ok', {
          color: 'green',
          onclick: () => {
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
  return new Promise((resolve, reject) => {
    ws.send('blackout')
    breadcrumb.select(1)
    speak().then(() => {
      let current = state.mappable.shift()
      ws.send('blackout')
      ws.send('light', {name: current.node.name, index: current.index})

      breadcrumb.setText(`${current.node.name}#${current.index}`)
      breadcrumb.setButtons([
        new Button(`<i class='fa fa-trash'></i>`, {
          color: 'red',
          onclick: () => {
            state.trashed.push(current)
            validate()
          }
        })
      ])

      grid.on('click', box => {
        if (!box.mapped) {
          // @NOTE: .was-not-validated comes from steps/map-until-check recursion
          box.removeClass('was-not-validated')
          box.setMapping(true)
          box.disable()
          current.box = box
          state.mapped.push(current)
          validate()
        }
      })

      function validate () {
        if (state.mappable.length) {
          current = state.mappable.shift()
          ws.send('blackout')
          ws.send('light', {name: current.node.name, index: current.index})
          breadcrumb.setText(`${current.node.name}#${current.index}`)
        } else {
          grid.off('click')
          resolve(state)
        }
      }
    }).catch(err => reject(err))
  })
}
