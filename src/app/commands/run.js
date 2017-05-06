/** @flow */

import type { Config, SpawnableCommand } from '../types'

type Argv = {
  target: string,
  env?: Array<string>,
}

import { echo } from 'shelljs'
import chalk from 'chalk'
import loadConfig from '../utils/loadConfig'
import proc from '../proc'
import resolveCommand from '../resolveCommand'
import getEnv from '../utils/getEnv'
import parseEnvVariables from '../utils/parseEnvVariables'

export const command = 'run <target>'
export const aliases = '*'

export const describe = 'Default execution command'

export const builder = {
  env: {
    array: true,
  },
}

const parseArgv = (argv: Argv, procArgv: Array<string>): Object => {
  const { target, env = [] } = argv
  let envString: string = `--env ${env.join(' ')}`
  let paramStr: string = procArgv.slice(2).join(' ')
  const sliceFrom: number = paramStr.indexOf(target) + target.length
  paramStr = paramStr.slice(sliceFrom)
  paramStr = paramStr.replace(envString, '')
  paramStr = paramStr.trim()
  const params: Array<string> = paramStr.split(' ')

  return { env, target, params }
}

export const handler = async (argv: Argv): Promise<void> => {
  try {
    const config: Config = await loadConfig()

    const { env, target, params } = parseArgv(argv, process.argv)
    const parsedEnv: Object = getEnv(parseEnvVariables(env))

    const command: ?SpawnableCommand = await resolveCommand(target, config)
    if (command) {
      const { cmd, args } = command
      params.unshift(...args)

      await proc(cmd, parsedEnv, params)
    } else {
      echo(chalk.yellow(`No match found for command: ${target}`))
    }
  } catch (e) {
    echo('Something went wrong executing a command', e)
  }
}
