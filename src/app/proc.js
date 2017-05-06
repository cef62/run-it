/* @flow */
import { spawn } from 'cross-spawn'
import { echo } from 'shelljs'
import chalk from 'chalk'
import getEnv from './utils/getEnv'
import normalizeCommand from './utils/normalizeCommand'

const NON_ERROR: number = 0

export default async function proc(
  command: string,
  env: Object = {},
  commandArgs: Array<*> = [],
): Promise<void> {
  return new Promise((resolve, reject) => {
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
      echo(chalk.blue(data.toString('utf8')))
    })

    exec.stderr.on('data', data => {
      echo(chalk.red(data.toString('utf8')))
    })

    exec.on('exit', process.exit)

    exec.on('error', error => {
      reject({
        message: chalk.red(`The script called "${command}" emitted an error`),
        ref: 'emitted-an-error',
        error,
      })
    })

    exec.on('close', code => {
      if (code === NON_ERROR) {
        resolve(code)
      } else {
        reject({
          message: chalk.red(
            `The script called "${command}" failed with exit code ${code}`,
          ),
          ref: 'failed-with-exit-code',
          code,
        })
      }
    })
  })
}
