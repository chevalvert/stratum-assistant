const minimist = require('minimist')
const minimistOpts = {
  boolean: ['open'],
  string: ['width', 'height'],
  alias: {
    open: ['o'],
    width: ['w'],
    height: ['h']
  },
  default: {
    open: false,
    width: 2,
    height: 2
  }
}

const argv = minimist(process.argv.slice(2), minimistOpts)

const args = {}
args.output = argv._[0] || process.cwd()
Object.keys(minimistOpts.alias).forEach(key => {
  if (
  argv.hasOwnProperty(key) !== undefined && typeof argv[key] !== 'undefined'
  ) {
    args[key] = argv[key]
  }
})

module.exports = args
