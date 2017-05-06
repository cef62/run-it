/* @flow */
import type { Config, Repository, SpawnableCommand, Script } from './types'

import path from 'path'
import fse from 'fs-extra'
import objectPath from 'object-path'
import { echo } from 'shelljs' // eslint-disable-line

const EXEC_PATH: string = process.cwd()
const NOT_FOUND: string = 'NOT_FOUND'

const composeCommand = (script: string): SpawnableCommand => {
  const [cmd, ...args] = script.split(' ')
  return { cmd, args }
}

export const getTargetModulePath = (
  rootPath: string,
  targetSteps: Array<string>,
  extensions: Array<string>,
): SpawnableCommand | string => {
  try {
    let sourceString: ?string
    let targetPath: string = path.join(rootPath, ...targetSteps)

    if (fse.pathExistsSync(targetPath)) {
      sourceString = targetPath
    }

    const ext: ?string = extensions.find((extension: string): boolean =>
      fse.pathExistsSync(`${targetPath}.${extension}`),
    )
    if (ext) {
      sourceString = targetPath + '.' + ext
    }

    if (sourceString) {
      return composeCommand(sourceString)
    }
  } catch (e) {
    return NOT_FOUND
  }
  return NOT_FOUND
}

export const getTargetScript = (
  target: string,
  scripts: Object,
): SpawnableCommand | string => {
  const sourceScript: ?Script = objectPath.get(scripts, target)

  if (sourceScript) {
    let sourceString: ?string

    if (typeof sourceScript === 'string') {
      sourceString = sourceScript
    } else if (typeof sourceScript === 'object') {
      const { default: def, script } = sourceScript

      if (def && typeof def === 'object' && def.script) {
        sourceString = def.script
      } else if (script) {
        sourceString = script
      }
    }

    if (sourceString) {
      return composeCommand(sourceString)
    }
  }

  return NOT_FOUND
}

export default async function resolveCommand(
  target: string,
  config: Config,
): Promise<?SpawnableCommand> {
  const {
    settings: { repositoriesRoot, extensions },
    repositories,
    scripts,
  }: Config = config

  let command: string | SpawnableCommand = NOT_FOUND
  const targetSteps: Array<string> = target.split('.')
  const moduleName: string = targetSteps.shift()

  // Script in a cloned repository
  const repoInfo: Repository = repositories[moduleName]
  if (repoInfo) {
    const { root: relativeRoot = '' } = repoInfo
    const rootPath: string = path.join(
      EXEC_PATH,
      repositoriesRoot,
      moduleName,
      relativeRoot,
    )
    command = getTargetModulePath(rootPath, targetSteps, extensions)
  }

  // Script in .run-script.js
  if (command === NOT_FOUND) {
    command = getTargetScript(target, scripts)
  }

  if (command !== NOT_FOUND && typeof command !== 'string') {
    return command
  }

  return undefined
}
