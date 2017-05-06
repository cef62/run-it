/** @flow */

export { default as handler } from './handler'

export const command = 'run <target>'
export const aliases = '*'

export const describe = 'Default execution command'

export const builder = {
  env: {
    array: true,
  },
}
