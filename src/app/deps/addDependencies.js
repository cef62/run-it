/** @flow */
import type { Repositories, Repository } from '../types'

type DependenciesMap = {
  dependencies: { [string]: string },
  devDependencies: { [string]: string },
}

import { echo } from 'shelljs'
import path from 'path'
import chalk from 'chalk'
import fse from 'fs-extra'
import proc from '../proc'
import getEnv from '../utils/getEnv'

const EXEC_PATH: string = process.cwd()

// TODO: version of dependencies should be considered and the user warned when
// multiple versions of a module are requested
export default async function addDependencies(
  repositoriesRoot: string,
  depsManager: string,
  repositories: Repositories,
): Promise<void> {
  try {
    const names: Array<string> = Object.keys(repositories)
    const depsArray: Array<string> = []

    for (const name of names) {
      const { url, deps }: Repository = repositories[name] || {}

      if (name.trim().length && url && deps) {
        const depsPath: string = path.join(
          EXEC_PATH,
          repositoriesRoot,
          name,
          deps,
        )

        if (fse.pathExistsSync(depsPath)) {
          const depsObj: ?DependenciesMap = await import(depsPath)

          if (depsObj) {
            const { dependencies = {}, devDependencies = {} } = depsObj
            depsArray.push(
              ...Object.keys(dependencies),
              ...Object.keys(devDependencies),
            )
          }
        }
      }
    }

    const depsList: Set<string> = new Set(depsArray)

    const {
      dependencies = {},
      devDependencies = {},
    }: DependenciesMap = await import(path.join(EXEC_PATH, 'package.json'))
    const currentDeps: Array<string> = [
      ...Object.keys(dependencies),
      ...Object.keys(devDependencies),
    ]

    currentDeps.forEach((moduleName: string): boolean =>
      depsList.delete(moduleName),
    )

    if (!depsList.size) {
      return
    }

    const cmdArgs: Array<string> = depsManager === 'npm'
      ? ['install', '--save-dev']
      : ['add', '--dev']

    cmdArgs.push(...Array.from(depsList))

    echo(
      chalk.magenta(
        'Installing dependencies, could take a while. Please be patient!',
      ),
    )
    const error: ?Object = await proc(depsManager, getEnv(), cmdArgs)
    // TODO: manage error notifications
  } catch (e) {
    echo('Error adding dependencies', e)
  }
}
