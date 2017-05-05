/* @flow */
import type { Config, Repository } from './types'

import path from 'path'
import fse from 'fs-extra'
import objectPath from 'object-path'
import { echo } from 'shelljs'

const EXEC_PATH: string = process.cwd()
const NOT_FOUND: string = 'NOT_FOUND'

export const getTargetModulePath = (
  rootPath: string,
  targetSteps: Array<string>,
  extensions: Array<string>,
): string => {
  try {
    let targetPath: string = path.join(rootPath, ...targetSteps)

    if (fse.pathExistsSync(targetPath)) {
      return targetPath
    }

    const ext: ?string = extensions.find((extension: string): boolean =>
      fse.pathExistsSync(`${targetPath}.${extension}`),
    )
    if (ext) {
      return (`${targetPath}.${ext}`)
    }
  } catch (e) {
    return NOT_FOUND
  }
  return NOT_FOUND
}

export const getTargetScript = (target: string, scripts: Object): string => {
  return objectPath.get(scripts, target) || NOT_FOUND
}

export default async function resolveCommand(
  target: string,
  config: Config,
): Promise<?string> {
  const {
    settings: { repositoriesRoot, extensions },
    repositories,
    scripts,
  }: Config = config

  const targetSteps: Array<string> = target.split('.')
  const moduleName: string = targetSteps.shift()

  const repoInfo: Repository = repositories[moduleName]
  if (repoInfo) {
    const { root: relativeRoot = '' } = repoInfo
    const rootPath: string = path.join(
      EXEC_PATH,
      repositoriesRoot,
      moduleName,
      relativeRoot,
    )

    const targetPath: string = getTargetModulePath(
      rootPath,
      targetSteps,
      extensions,
    )
    if (targetPath !== NOT_FOUND) {
      return targetPath
    }
  }

  const targetScript: string = getTargetScript(target, scripts)
  if (targetScript !== NOT_FOUND) {
    return targetScript
  }

  return undefined
}
