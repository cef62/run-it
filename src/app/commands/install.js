/** @flow */
import type { Config } from '../types'

import { echo } from 'shelljs'
import addRepositories from '../git/addRepositories'
import loadConfig from '../utils/loadConfig'

export const command = 'install'

export const describe = 'Clones linked script repositories'

export const handler = async () => {
  try {
    const {
      settings: { repositoriesRoot },
      repositories,
    }: Config = await loadConfig()

    // TODO: notify if no repository is available
    // TODO: define rule on how to map script (easy way: define the path to the
    // script roots folde)

    await addRepositories(repositoriesRoot, repositories)
    echo('Repositories cloning complete.')
  } catch (e) {
    echo('Something went wrong cloning repositories', e)
  }
}
