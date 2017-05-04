/* @flow */
// Based on https://github.com/kentcdodds/cross-env
import { envUnixRegex, isWindows } from './shared'

export default function commandConvert(command: string): string {
  if (!isWindows) {
    return command
  }
  return command.replace(envUnixRegex, '%$1$2%')
}
