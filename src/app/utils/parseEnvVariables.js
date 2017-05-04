/* @flow */

export default function parseEnvVariables(source: Array<string>): Object {
  return source.reduce((env: Object, data: string): Object => {
    const [key, value] = data.split('=')
    if (key !== undefined && value !== undefined) {
      env[key] = value
    }
    return env
  }, {})
}
