/* @flow */
import { spawn } from 'cross-spawn'
import { echo } from 'shelljs'
import getEnv from './utils/getEnv'
import normalizeCommand from './utils/normalizeCommand'

export default function proc(
  command: string,
  env: Object = {},
  commandArgs: Array<*>,
): child_process$ChildProcess {
  const exec: child_process$ChildProcess = spawn(
    normalizeCommand(command),
    commandArgs.map(normalizeCommand),
    {
      stdio: [null, null, null, null],
      // shell: true,
      detached: true,
      env: getEnv(env),
    },
  )
  process.on('SIGTERM', () => exec.kill('SIGTERM'))
  process.on('SIGINT', () => exec.kill('SIGINT'))
  process.on('SIGBREAK', () => exec.kill('SIGBREAK'))
  process.on('SIGHUP', () => exec.kill('SIGHUP'))

  exec.stdout.on('data', data => {
    echo(data.toString('utf8'))
  })

  exec.stderr.on('data', data => {
    echo(data.toString('utf8'))
  })

  exec.on('exit', process.exit)
  return exec
}
