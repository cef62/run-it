/* @flow */

export type Settings = { repositoriesRoot: string }
export type Repository = { url: string, root?: string }
export type Repositories = { [string]: Repository }

export type Config = {
  settings: Settings,
  repositories: Repositories,
  scripts: { [string]: Object },
}