/** @flow */
import type { Config } from '../types'

import { echo } from 'shelljs'
import chalk from 'chalk'
import addRepositories from '../git/addRepositories'
import addDependencies from '../deps/addDependencies'
import loadConfig from '../utils/loadConfig'

export const command = 'install'

export const describe = 'Clones linked script repositories'

export const handler = async () => {
  try {
    const {
      settings: { repositoriesRoot, depsManager },
      repositories,
    }: Config = await loadConfig()

    // TODO: notify if no repository is available
    // TODO: define rule on how to map script (easy way: define the path to the
    // script roots folde)

    echo(chalk.yellow(`Adding Repositories`))
    await addRepositories(repositoriesRoot, repositories)

    echo(chalk.yellow(`Adding Repositories dependencies`))
    await addDependencies(repositoriesRoot, depsManager, repositories)

    echo(chalk.yellow('Repositories cloning complete.'))
  } catch (e) {
    echo('Something went wrong cloning repositories', e)
  }
}
