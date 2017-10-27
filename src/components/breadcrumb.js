'use strict'

import bel from 'bel'
import raw from 'bel/raw'

const steps = [
  'Plug check',
  'Mapping',
  'Position check'
]

const footer = bel`<footer class='main' role='main'>
  <ul class='breadcrumb'>
    ${steps.map(step => {
      return bel`
      <li>
        <header>${step}</header>
        <div class='breadcrumb-content'></div>
        <div class='breadcrumb-buttons'></div>
      </li>`
    })}
  </ul>
</footer>`

document.body.appendChild(footer)

let index = 0
function select (i) {
  const els = disable()
  index = Math.min(Math.max(0, i), els.length)
  els[index].classList.add('is-active')
}

function disable () {
  const els = footer.querySelectorAll('ul > li')
  els.forEach((el) => el.classList.contains('is-active') && el.classList.remove('is-active'))
  return els
}

function setText (str) {
  const container = footer.querySelector('li.is-active > .breadcrumb-content')
  if (container) container.innerHTML = str
}

function setButtons (buttons) {
  const container = footer.querySelector('li.is-active > .breadcrumb-buttons')
  if (container) {
    container.innerHTML = ''
    buttons.forEach(b => container.appendChild(b.el))
  }
}

export default {
  select,
  disable,
  setText,
  setButtons,
  next: () => select(index + 1),
  previous: () => select(index - 1)
}
