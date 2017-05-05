/** @flow */
import NodeGit from 'nodegit'

// see: https://github.com/nodegit/nodegit/issues/1133
// see: http://radek.io/2015/10/27/nodegit/
const credentials = (url, userName) => NodeGit.Cred.sshKeyFromAgent(userName)
const certificateCheck = () => 1

export default function composeCallbacks(repoPath: string): Object {
  const callbacks = { certificateCheck }
  if (!repoPath.startsWith('http')) {
    // $FlowFixMe
    Object.assign(callbacks, { credentials })
  }
  return callbacks
}
