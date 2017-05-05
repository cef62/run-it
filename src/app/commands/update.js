/** @flow */
import type { Config } from '../types'

import { echo } from 'shelljs'
import pullRepositories from '../git/pullRepositories'
import loadConfig from '../utils/loadConfig'

export const command = 'update'

export const describe = 'Update linked script repositories'

export const handler = async () => {
  try {
    const {
      settings: { repositoriesRoot },
      repositories,
    }: Config = (await loadConfig()) || {}

    await pullRepositories(repositoriesRoot, repositories)
    echo('Repositories update complete.')
  } catch (e) {
    echo('Something went wrong updating repositories', e)
  }
}
