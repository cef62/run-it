/** @flow */

type Argv = {
  env?: Array<string>,
}

import { echo } from 'shelljs'
import NodeGit from 'nodegit'
import fse from 'fs-extra'
import loadConfig from '../utils/loadConfig'

export const command = 'install'

export const describe = 'Clones linked script repositories'

export const builder = {
  env: {
    alias: 'e',
    array: true,
  },
}

// see: https://github.com/nodegit/nodegit/issues/1133
// see: http://radek.io/2015/10/27/nodegit/
const credentials = (url, userName) => NodeGit.Cred.sshKeyFromAgent(userName)
const certificateCheck = () => 1

const addRepository = async (pathToRepo: string, localPathToRepo: string) => {
  await fse.remove(localPathToRepo)

  const callbacks = { certificateCheck }

  if (!pathToRepo.startsWith('http')) {
    // $FlowFixMe
    Object.assign(callbacks, { credentials })
  }

  const repo = await NodeGit.Clone(pathToRepo, localPathToRepo, {
    fetchOpts: { callbacks },
  })
  const commit = await repo.getHeadCommit()
  const entry = await commit.getEntry('README.md')
  const blob = await entry.getBlob()

  echo(entry.name(), entry.sha(), blob.rawsize() + 'b')
  echo('========================================================\n\n')
  var firstTenLines = blob.toString().split('\n').slice(0, 10).join('\n')
  echo(firstTenLines)
  echo('...')
}

export const handler = async (argv: Argv) => {
  try {
    const config = await loadConfig()

    // TODO: notify if no repository is available
    // TODO: define rule on how to map script (easy way: define the path to the
    // script roots folde)

    // TODO: parse real repositories
    const pathToRepo: string = 'https://github.com/styleguidist/snapguidist.git'
    // const pathToRepo: string = 'git@github.com:WorkWave/volo-unified-ui-components.git'
    const localPathToRepo: string = './tmp/snapguidist'
    await addRepository(pathToRepo, localPathToRepo)
    echo('DONE!', config)
  } catch (e) {
    echo('Something went wrong', e)
  }
}
