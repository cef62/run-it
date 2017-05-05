/** @flow */
import { echo } from 'shelljs'
import fse from 'fs-extra'
import NodeGit from 'nodegit'

// see: https://github.com/nodegit/nodegit/issues/1133
// see: http://radek.io/2015/10/27/nodegit/
const credentials = (url, userName) => NodeGit.Cred.sshKeyFromAgent(userName)
const certificateCheck = () => 1

export default async function addRepository(
  repoPath: string,
  localPath: string,
): Promise<void> {
  try {
    await fse.remove(localPath)

    const callbacks = { certificateCheck }
    if (!repoPath.startsWith('http')) {
      // $FlowFixMe
      Object.assign(callbacks, { credentials })
    }

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
    echo('Error adding repository', e)
  }
}
