'use strict'

import bel from 'bel'
import raw from 'bel/raw'

import C from 'components/default'
import Box from 'components/box'

const defaultOpts = {
  margin: 2,
  cols: 2,
  rows: 2,
  onclick: function () {}
}

export default class Grid extends C {
  constructor(opts) {
    super()
    this.opts = Object.assign({}, defaultOpts, opts || {})

    this.boxes = this._boxes()
    this.el = bel`
    <svg class='grid' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'>
      ${this._lines()}
      ${this.boxes.map(b => b.el)}
    </svg>`
  }

  coordToPercent (i, j) {
    return {
      x: this.opts.margin + i / (this.opts.cols - 1) * (100 - this.opts.margin * 2),
      y: this.opts.margin + j / (this.opts.rows - 1) * (100 - this.opts.margin * 2)
    }
  }

  _lines () {
    const lines = []
    for (let i = 0; i < this.opts.cols; i++) {
      let a = this.coordToPercent(i, 0)
      let b = this.coordToPercent(i, this.opts.rows - 1)
      lines.push(this._line(a, b))
    }
    for (let j = 0; j < this.opts.rows; j++) {
      let a = this.coordToPercent(0, j)
      let b = this.coordToPercent(this.opts.cols - 1, j)
      lines.push(this._line(a, b))
    }
    return lines
  }

  _boxes () {
    const boxes = []
    const that = this
    for (let i = 0; i < this.opts.cols; i++) {
      for (let j = 0; j < this.opts.rows; j++) {
        let pos = this.coordToPercent(i, j)
        boxes.push(new Box(i, j, pos, {
          onclick: function (e) {
            if (!this.disabled) return that.emit('click', this)
            e.preventDefault()
          }
        }))
      }
    }
    return boxes
  }

  _line (a, b) {
    return bel`<line x1='${a.x}%' y1='${a.y}%' x2='${b.x}%' y2='${b.y}%' />`
  }
}
