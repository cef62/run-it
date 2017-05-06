/* @flow */

export type Settings = {
  repositoriesRoot: string,
  extensions: Array<string>,
  depsManager: 'npm' | 'yarn',
}
export type Repository = { url: string, root?: string, deps: ?string }
export type Repositories = { [string]: Repository }

export type ScriptObject = {
  script: string,
  description?: string,
  hidden?: boolean,
  default?: Object,
}

export type Script = string | ScriptObject

export type Config = {
  settings: Settings,
  repositories: Repositories,
  scripts: { [string]: Object },
}

export type SpawnableCommand = {
  cmd: string,
  args?: Array<string>,
}

export type Spinner = {
  start(): Spinner,
  stop(): Spinner,
  succeed(text: ?string): Spinner,
  fail(text: ?string): Spinner,
  warn(text: ?string): Spinner,
  info(text: ?string): Spinner,
  stopAndPersist(options: ?Object): Spinner,
  clear(): Spinner,
  render(): Spinner,
  frame(): void,
  text: string,
  color: string,
}
