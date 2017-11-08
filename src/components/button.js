'use strict'

import bel from 'bel'
import raw from 'bel/raw'
import C from 'components/default'

const defaultOpts = {
  color: 'green',
  onclick: function () {}
}

export default class Button extends C {
  constructor (message, opts) {
    super()
    this.opts = Object.assign({}, defaultOpts, opts || {})

    this.el = bel`
    <button
      data-color='${opts.color}'
      onclick=${e => {
        this.el.blur()
        opts.onclick(e)
      }}
    >${raw(message)}</button>`
  }
}
