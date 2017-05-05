/** @flow */

import type { Repositories, Repository } from '../types'

import { echo } from 'shelljs'
import path from 'path'
import pullRepository from './pullRepository'

export default async function addRepositories(
  repositoriesRoot: string,
  repos: Repositories,
) {
  const names: Array<string> = Object.keys(repos)
  for (const name: string of names) {
    if (repos[name]) {
      const { url }: Repository = repos[name]
      const localPath: string = path.join(repositoriesRoot, name)
      await pullRepository(url, localPath)
      echo(`Updated repository [${name}]\n  url: ${url}\n  path: ${localPath}`)
    }
  }
}
