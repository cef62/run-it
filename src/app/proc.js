/* @flow */
import { spawn } from 'cross-spawn'
import chalk from 'chalk'
import getEnv from './utils/getEnv'
import normalizeCommand from './utils/normalizeCommand'
import { info, succeed, error } from './utils/logger'

const NON_ERROR: number = 0

export default async function proc(
  command: string,
  env: Object = {},
  commandArgs: Array<*> = [],
): Promise<Object | number> {
  return new Promise((resolve, reject) => {
    info(chalk.dim(`$ ${command} ${commandArgs.join(' ')}`), true)

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
      info(data.toString('utf8'), true)
    })

    exec.stderr.on('data', data => {
      error(data.toString('utf8'), true)
    })

    exec.on('exit', () => {
      succeed('Command executed')
      resolve(NON_ERROR)
    })

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
