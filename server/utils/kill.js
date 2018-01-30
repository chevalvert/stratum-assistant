'use strict'

const ps = require('ps-node')

module.exports = (processName, allowSuicide = false) => new Promise ((resolve, reject) => {
  ps.lookup({ command: processName }, (err, processes) => {
    if (err) reject(err)

    if (!processes || processes.length === 0) resolve()

    const toKill = processes.filter(({ pid }) => !(!allowSuicide && pid == process.pid))
    if (toKill.length === 0) resolve()

    toKill.forEach(({ pid }) => {
      ps.kill(pid, 'SIGKILL', err => {
        if (err) reject(err)
        resolve()
      })
    })
  })
})
