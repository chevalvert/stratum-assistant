'use strict'

import bel from 'bel'
import raw from 'bel/raw'
import C from 'components/default'

const defaultOpts = {
  color: 'red',
  buttons: []
}

export default class Alert extends C {
  constructor (message, opts) {
    super()
    this.opts = Object.assign({}, defaultOpts, opts || {})

    message = Array.isArray(message)
      ? message.map(p => bel`<p>${raw(p)}</p>`)
      : raw(message)


    this.el = bel`
    <div class='alert-overlay'>
      <div class='alert' data-color='${opts.color}'>
        <div class='alert-message'>${message}</div>
        <div class='alert-footer'>
          ${opts.buttons && opts.buttons.map(b => b.el)}
        </div>
      </div>
    </div>`
  }
}
