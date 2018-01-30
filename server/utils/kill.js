'use strict'

const ps = require('ps-node')

module.exports = (processName) => new Promise ((resolve, reject) => {
  ps.lookup({ command: processName }, (err, processes) => {
    if (err) reject(err)

    if (!processes || processes.length === 0) resolve()

    processes.forEach(({ pid }) => {
      ps.kill(pid, 'SIGKILL', err => {
        if (err) reject(err)
        resolve()
      })
    })
  })
})
