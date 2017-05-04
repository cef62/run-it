/* @flow */
import isOsWindows from 'is-windows'

export const isWindows = isOsWindows()
export const targetSeparator: string = isOsWindows() ? ';' : ':'
export const envUnixRegex: RegExp = /\$(\w+)|\${(\w+)}/g // $my_var or ${my_var}
export const escapedCharRegex: RegExp = /(\\*):/g
