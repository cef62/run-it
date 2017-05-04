/** @flow */

type Argv = {
  target: string,
  params?: string,
  env?: Array<string>,
}

import { echo } from 'shelljs'
import proc from '../proc'
import getCommandExecutor from '../getCommandExecutor'
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

export const handler = (argv: Argv): void => {
  const { env, target, params } = parseArgv(argv, process.argv)
  const parsedEnv: Object = getEnv(parseEnvVariables(env))
  // echo('RUN IT -->', { parsedEnv, target, params })

  const cmd: string = getCommandExecutor(target)
  proc(cmd, parsedEnv, params)
}
