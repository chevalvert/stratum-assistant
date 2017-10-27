'use strict'

import Emitter from 'tiny-emitter'

const em = new Emitter()

document.addEventListener('keyup', e => {
  if (e.keyCode === 13) em.emit('enter')
  if (e.keyCode === 8 || e.keyCode === 46) em.emit('return')
})

export default em
