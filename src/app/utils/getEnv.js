/* @flow */
import path from 'path'
import managePath from 'manage-path'
import { sync as findUp } from 'find-up'
import normalizeEnvVariables from './normalizeEnvVariables'

export default function getEnv(envSource: Object = {}): Object {
  const env = Object.assign({}, process.env)
  const alterPath = managePath(env)
  const npmBin = findUp(path.join('node_modules', '.bin'))
  if (npmBin) {
    alterPath.unshift(npmBin)
  }

  if (process.env.APPDATA) {
    env.APPDATA = process.env.APPDATA
  }

  return Object.keys(
    envSource,
  ).reduce((envObj: Object, name: string): Object => {
    envObj[name] = normalizeEnvVariables(envSource[name])
    return envObj
  }, env)
}
