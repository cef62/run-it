/** @flow */

type Argv = {
  url: string,
}

import { echo } from 'shelljs'

export const command = 'test'

export const describe = 'Command description placeholder'

export const builder = {
  url: {
    alias: 'u',
    default: 'http://yargs.js.org/',
  },
}

export const handler = (argv: Argv): void => {
  echo(argv.url)
}
