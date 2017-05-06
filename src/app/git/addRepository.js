/** @flow */
import { echo } from 'shelljs'
import chalk from 'chalk'
import fse from 'fs-extra'
import NodeGit from 'nodegit'
import composeCallbacks from './composeCallbacks'
import { log, succeed, error } from '../utils/logger'

export default async function addRepository(
  repoPath: string,
  localPath: string,
): Promise<void> {
  try {
    log(`Removing folder: '${localPath}'`, true)
    await fse.remove(localPath)
    succeed(`Removed folder: '${localPath}'`)

    const callbacks = composeCallbacks(repoPath)

    const repo = await NodeGit.Clone(repoPath, localPath, {
      fetchOpts: { callbacks },
    })

    // const commit = await repo.getHeadCommit()
    // const entry = await commit.getEntry('README.md')
    // const blob = await entry.getBlob()
    //
    // echo('========================================================>\n\n')
    // echo(entry.name(), entry.sha(), blob.rawsize() + 'b')
    // echo('<========================================================\n\n')
    // var firstTenLines = blob.toString().split('\n').slice(0, 10).join('\n')
    // echo(firstTenLines)
    // echo('...')

    return repo
  } catch (e) {
    error('Error adding repository')
    echo(chalk.red(e))
  }
}
