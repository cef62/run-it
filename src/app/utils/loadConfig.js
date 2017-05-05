/* @flow */
import path from 'path'

const EXEC_PATH: string = process.cwd()

export default async function loadConfig() {
  const configPath = path.join(EXEC_PATH, '.run-it.js')
  const config = await import(configPath)
  return config
}
