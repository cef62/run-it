/** @flow */

import type { Repositories, Repository } from '../types'

import { echo } from 'shelljs'
import path from 'path'
import addRepository from './addRepository'

export default async function addRepositories(
  repositoriesRoot: string,
  repos: Repositories,
) {
  const names: Array<string> = Object.keys(repos)
  for (const name: string of names) {
    if (repos[name]) {
      const { url }: Repository = repos[name]
      const localPath: string = path.join(repositoriesRoot, name)
      await addRepository(url, localPath)
      echo(`Added repository [${name}]\n  url: ${url}\n  path: ${localPath}`)
    }
  }
}
