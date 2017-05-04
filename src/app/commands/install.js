/** @flow */

type Argv = {
  env?: Array<string>,
}

import { echo } from 'shelljs'
import NodeGit from 'nodegit'
import fse from 'fs-extra'

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

const addRepository = (pathToRepo: string, localPathToRepo: string) => {
  fse.remove(localPathToRepo).then(() => {
    let entry

    const callbacks = { certificateCheck }

    if (!pathToRepo.startsWith('http')) {
      // $FlowFixMe
      Object.assign(callbacks, { credentials })
    }

    NodeGit.Clone(pathToRepo, localPathToRepo, { fetchOpts: { callbacks } })
      .then(repo => {
        return repo.getHeadCommit()
      })
      .then(commit => commit.getEntry('README.md'))
      .then(entryResult => {
        entry = entryResult
        return entry.getBlob()
      })
      .done(blob => {
        echo(entry.name(), entry.sha(), blob.rawsize() + 'b')
        echo('========================================================\n\n')
        var firstTenLines = blob.toString().split('\n').slice(0, 10).join('\n')
        echo(firstTenLines)
        echo('...')
      })
  })
}

export const handler = (argv: Argv): void => {
  // TODO: read repositories from .runit
  // TODO: notify if no repository is available
  // TODO: define rule on how to map script (easy way: define the path to the
  // script roots folde)

  // TODO: parse real repositories
  const pathToRepo: string = 'https://github.com/styleguidist/snapguidist.git'
  // const pathToRepo: string = 'git@github.com:WorkWave/volo-unified-ui-components.git'
  const localPathToRepo: string = './tmp/snapguidist'
  addRepository(pathToRepo, localPathToRepo)
}
