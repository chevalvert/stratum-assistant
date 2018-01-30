'use strict'

import waterfall from 'run-waterfall'
import checkIfStandby from 'steps/check-if-standby'
import init from 'steps/init'
import welcome from 'steps/welcome'
import mapUntilCheck from 'steps/map-until-check'
import save from 'steps/save'

import error from 'steps/error'
import success from 'steps/success'

waterfall(
  [
    checkIfStandby,
    init,
    welcome,
    mapUntilCheck,
    save,
  ],
  (err, state) => err
    ? error(err, state)
    : success(err, state)
)
