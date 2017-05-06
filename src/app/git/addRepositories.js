/** @flow */

import type { Repositories, Repository } from '../types'

import path from 'path'
import addRepository from './addRepository'
import { log, succeed } from '../utils/logger'

export default async function addRepositories(
  repositoriesRoot: string,
  repos: Repositories,
) {
  const names: Array<string> = Object.keys(repos)
  for (const name: string of names) {
    if (repos[name]) {
      log(`Cloning repository [${name}]`, true)
      const { url }: Repository = repos[name]
      const localPath: string = path.join(repositoriesRoot, name)
      await addRepository(url, localPath)
      succeed(`Added repository [${name}]\n  url: ${url}\n  path: ${localPath}`)
    }
  }
}
