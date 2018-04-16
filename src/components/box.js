'use strict'

import bel from 'bel'
import C from 'components/default'

const defaultOpts = {
  onclick: function () {}
}

export default class Box extends C {
  constructor (i, j, pos, opts) {
    super()
    this.opts = Object.assign({}, defaultOpts, opts || {})
    this.position = {i, j}
    this.el = bel`
    <rect
      i='${i}'
      j='${j}'
      x='${pos.x.toFixed(2)}%'
      y='${pos.y.toFixed(2)}%'
      onclick=${this.opts.onclick.bind(this)}
    />`
  }

  disable () {
    this.disabled = true
    this.addClass('is-disabled')
  }

  enable () {
    this.disabled = false
    this.removeClass('is-disabled')
  }

  setMapping (success) {
    this.mapped = success
    if (success) this.addClass('is-mapped')
    else this.removeClass('is-mapped')
  }
}
