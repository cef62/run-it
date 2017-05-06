/** @flow */
import { echo } from 'shelljs'
import NodeGit from 'nodegit'
import chalk from 'chalk'
import composeCallbacks from './composeCallbacks'
import { error } from '../utils/logger'

export default async function pullRepository(
  repoPath: string,
  localPath: string,
): Promise<void> {
  try {
    const callbacks = composeCallbacks(repoPath)

    const repo = await NodeGit.Repository.open(localPath)
    await repo.fetchAll({ callbacks })
    await repo.mergeBranches('master', 'origin/master')

    return repo
  } catch (e) {
    error('Error adding repository')
    echo(chalk.red(e))
  }
}
