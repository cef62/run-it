/* @flow */
import type { Config, Settings, Repositories, Repository } from '../types'

import path from 'path'
import { echo } from 'shelljs'

const EXEC_PATH: string = process.cwd()

export const parseSettings = (source: $Shape<Settings> = {}): Settings => {
  const {
    repositoriesRoot = './repositories',
    extensions = ['js', 'sh'],
    depsManager = 'npm',
  } = source
  return { repositoriesRoot, extensions, depsManager }
}

export const parseRepositories = (source: Repositories = {}): Repositories =>
  Object.keys(
    source,
  ).reduce((repos: Repositories, name: string): Repositories => {
    const { url, root = '', deps }: Repository = source[name] || {}
    if (!name.trim().length || !url) {
      echo(`Invalid repository settings with key: ${name}`)
    } else {
      repos[name] = { url, root, deps }
    }
    return repos
  }, {})

export default async function loadConfig() {
  const configPath = path.join(EXEC_PATH, '.run-it.js')
  const config = await import(configPath)

  const { settings, repositories, scripts }: Config = config || {}
  // TODO: add parsing for scripts
  return {
    scripts,
    settings: parseSettings(settings),
    repositories: parseRepositories(repositories),
  }
}
