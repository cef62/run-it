/** @flow */

import type { Argv } from './types'

export default function parseArgv(argv: Argv, procArgv: Array<string>): Object {
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
