'use strict'

import Alert from 'components/alert'
import ws from 'utils/websocket'
import getUrlParam from 'utils/get-url-param'
import Grid from 'components/grid'

export default function (next) {
  const message = `Connecting to Stratum...`
  const alert = new Alert(message, { color: 'yellow' }).spawn()

  const grid = new Grid({ cols: getUrlParam('w') || 1,  rows: getUrlParam('h') || 1 }).spawn()

  ws.once('connected', nodes => {
    ws.send('light:all')
    alert.destroy()
    next(null, {
      grid,
      mapped: [],    // strips that have been mapped, but not validated yet
      validated: [], // strips that have been mapped and validated
      trashed: [],   // strips that are not plugged

      // strips to be mapped
      mappable: nodes.sort((a, b) => {
        const aname = a.name.toUpperCase()
        const bname = b.name.toUpperCase()
        return aname === bname ? 0 : (aname < bname ? -1 : 1)
      }).reduce((arr, node) => {
        const strips = []
        for (let i = 0; i < 4; i++) strips.push({node, index: i})
        return arr.concat(strips)
      }, [])
    })
  })
}
