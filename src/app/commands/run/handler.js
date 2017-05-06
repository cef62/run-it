/** @flow */

import type { Config, SpawnableCommand } from '../../types'
import type { Argv } from './types'

import { echo } from 'shelljs'
import chalk from 'chalk'
import { log, succeed, error } from '../../utils/logger'
import loadConfig from '../../utils/loadConfig'
import proc from '../../proc'
import resolveCommand from '../../resolveCommand'
import getEnv from '../../utils/getEnv'
import parseEnvVariables from '../../utils/parseEnvVariables'

import parseArgv from './parseArgv'

export default async function handler(argv: Argv): Promise<void> {
  try {
    log('Loading config', true)

    const config: Config = await loadConfig()
    succeed('Configuration loaded')

    const { env, target, params } = parseArgv(argv, process.argv)
    const parsedEnv: Object = getEnv(parseEnvVariables(env))

    log('Looking for a matching command', true)
    const command: ?SpawnableCommand = await resolveCommand(target, config)

    if (command) {
      succeed('Command found')

      const { cmd, args } = command
      params.unshift(...args)

      await proc(cmd, parsedEnv, params)
    } else {
      error(`No match found for command: ${target}`)
    }
  } catch (e) {
    error('Something went wrong executing a command')
    echo(chalk.red(e))
  }
}
