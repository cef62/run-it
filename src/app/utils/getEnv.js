/* @flow */
import normalizeEnvVariables from './normalizeEnvVariables'

export default function getEnv(envSource: Object = {}): Object {
  const env = Object.assign({}, process.env)

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
