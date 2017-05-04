/* @flow */
// Based on https://github.com/kentcdodds/cross-env
import { targetSeparator, envUnixRegex, escapedCharRegex } from './shared'

/**
 * This will transform UNIX-style list values to Windows-style.
 * For example, the value of the $PATH variable "/usr/bin:/usr/local/bin:."
 * will become "/usr/bin;/usr/local/bin;." on Windows.
 */
function replaceListDelimiters(value: string): string {
  return value.replace(
    escapedCharRegex,
    (match: string, backslashes: string): string => {
      if (backslashes.length % 2) {
        // Odd number of backslashes preceding it means it's escaped,
        // remove 1 backslash and return the rest as-is
        return match.substr(1)
      }
      return backslashes + targetSeparator
    },
  )
}

/**
 * This will attempt to resolve the value of any env variables that are inside
 * this string. For example, it will transform this:
 * cross-env FOO=$NODE_ENV echo $FOO
 * Into this:
 * FOO=development echo $FOO
 * (Or whatever value the variable NODE_ENV has)
 * Note that this function is only called with the right-side portion of the
 * env var assignment, so in that example, this function would transform
 * the string "$NODE_ENV" into "development"
 */
function resolveEnvVars(value: string): string {
  return value.replace(
    envUnixRegex,
    (_: any, name: string, altName: string): string =>
      process.env[name || altName] || '',
  )
}

/**
 * Converts an environment variable value to be appropriate for the current OS.
 */
export default function normalizeEnvVariables(value: string): string {
  return resolveEnvVars(replaceListDelimiters(value))
}
