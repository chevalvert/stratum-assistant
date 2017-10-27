'use strict'

import Emitter from 'tiny-emitter'

export default class extends Emitter {
  spawn (container = document.body) {
    container.appendChild(this.el)
    return this
  }

  destroy () {
    this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
    this.el = null
  }

  addClass (className) { this.el.classList.add(className) }
  removeClass (className) { this.el.classList.contains(className) && this.el.classList.remove(className) }
}
