/** @flow */

import type { Repositories, Repository } from '../types'

import path from 'path'
import pullRepository from './pullRepository'
import { log, succeed } from '../utils/logger'

export default async function addRepositories(
  repositoriesRoot: string,
  repos: Repositories,
) {
  const names: Array<string> = Object.keys(repos)
  for (const name: string of names) {
    if (repos[name]) {
      log(`Updating repository [${name}]`, true)
      const { url }: Repository = repos[name]
      const localPath: string = path.join(repositoriesRoot, name)
      await pullRepository(url, localPath)
      succeed(
        `Updated repository [${name}]\n  url: ${url}\n  path: ${localPath}`,
      )
    }
  }
}
