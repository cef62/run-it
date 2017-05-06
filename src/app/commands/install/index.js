/** @flow */

export { default as handler } from './handler'

export const command = 'install'

export const describe = 'Clones linked script repositories'

export const builder = {
  'ignore-deps': {
    alias: 'ignoreDeps',
    default: false,
    type: 'boolean',
  },
  'deps-only': {
    alias: 'depsOnly',
    default: false,
    type: 'boolean',
  },
}
