/** @flow */
import { echo } from 'shelljs'
import NodeGit from 'nodegit'
import composeCallbacks from './composeCallbacks'

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
    echo('Error adding repository', e)
  }
}
