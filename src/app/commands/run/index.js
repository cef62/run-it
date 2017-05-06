/** @flow */

import handlerFn from './handler'

export const handler = handlerFn

export const command = 'run <target>'
export const aliases = '*'

export const describe = 'Default execution command'

export const builder = {
  env: {
    array: true,
  },
}
