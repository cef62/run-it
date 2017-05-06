/** @flow */
import type { Config } from '../types'

type Argv = {
  'ignoreDeps': boolean,
  'depsOnly': boolean,
}

import { echo } from 'shelljs'
import chalk from 'chalk'
import addRepositories from '../git/addRepositories'
import addDependencies from '../deps/addDependencies'
import loadConfig from '../utils/loadConfig'
import { log, succeed, warn, error } from '../utils/logger'

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

export const handler = async (argv: Argv) => {
  try {
    const { ignoreDeps, depsOnly } = argv
    const {
      settings: { repositoriesRoot, depsManager },
      repositories,
    }: Config = await loadConfig()

    if (!Object.keys(repositories).length) {
      warn('No repositories to install in `.run-it.js`')
      return
    }

    if (depsOnly && ignoreDeps) {
      warn(`Nothing to do, change your command options!`)
      return
    }

    if (depsOnly) {
      warn(`Ignoring to add Repositories`)
    } else {
      log(`Adding Repositories`, true)
      await addRepositories(repositoriesRoot, repositories)
    }

    if (ignoreDeps) {
      warn(`Ignoring Repositories dependencies`)
    } else {
      log(`Adding Repositories dependencies`, true)
      await addDependencies(repositoriesRoot, depsManager, repositories)
    }

    succeed('Repositories cloning complete.')
  } catch (e) {
    error('Something went wrong cloning repositories')
    echo(chalk.red(e))
  }
}
