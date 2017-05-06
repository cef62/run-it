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

    // TODO: notify if no repository is available

    if (depsOnly && ignoreDeps) {
      echo(chalk.yellow(`Nothing to do, change your command options!`))
      return
    }

    if (depsOnly) {
      echo(chalk.yellow(`Ignoring to add Repositories`))
    } else {
      echo(chalk.yellow(`Adding Repositories`))
      await addRepositories(repositoriesRoot, repositories)
    }

    if (ignoreDeps) {
      echo(chalk.yellow(`Ignoring Repositories dependencies`))
    } else {
      echo(chalk.yellow(`Adding Repositories dependencies`))
      await addDependencies(repositoriesRoot, depsManager, repositories)
    }
    echo(chalk.yellow('Repositories cloning complete.'))
  } catch (e) {
    echo('Something went wrong cloning repositories', e)
  }
}
