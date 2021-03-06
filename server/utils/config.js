'use strict'

const path = require('path')
const minimist = require('minimist')
const minimistOpts = {
  boolean: ['open', 'standby'],
  string: ['width', 'height'],
  alias: {
    open: ['o'],
    width: ['w'],
    height: ['h'],
    standby: ['s']
  },
  default: {
    open: false,
    standby: false,
    width: 2,
    height: 2
  }
}

const argv = minimist(process.argv.slice(2), minimistOpts)

const args = {}
args.output = argv._[0] || path.join(process.cwd(), 'mapping.json')
Object.keys(minimistOpts.alias).forEach(key => {
  if (
  argv.hasOwnProperty(key) !== undefined && typeof argv[key] !== 'undefined'
  ) {
    args[key] = argv[key]
  }
})

module.exports = args
