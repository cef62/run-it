/** @flow */
import type { Config } from '../types'

import { echo } from 'shelljs'
import chalk from 'chalk'
import pullRepositories from '../git/pullRepositories'
import loadConfig from '../utils/loadConfig'
import { log, succeed, error } from '../utils/logger'

export const command = 'update'

export const describe = 'Update linked script repositories'

export const handler = async () => {
  try {
    log('Loading config', true)
    const {
      settings: { repositoriesRoot },
      repositories,
    }: Config = await loadConfig()
    succeed('Configuration loaded', true)

    await pullRepositories(repositoriesRoot, repositories)
    succeed('Repositories update complete.')
  } catch (e) {
    error('Something went wrong updating repositories')
    echo(chalk.red(e))
  }
}
