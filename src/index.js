'use strict'

import waterfall from 'run-waterfall'
import init from 'steps/init'
import welcome from 'steps/welcome'
import mapUntilCheck from 'steps/map-until-check'
import save from 'steps/save'

import error from 'steps/error'
import success from 'steps/success'

import ws from 'utils/websocket'

ws.on('newnode', () => location.reload())

waterfall(
  [
    init,
    welcome,
    mapUntilCheck,
    save,
  ],
  (err, state) => err
    ? error(err, state)
    : success(err, state)
)
