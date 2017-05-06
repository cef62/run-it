module.exports = {
  settings: {
    repositoriesRoot: './tmp',
    extensions: ['js', 'sh']
  },
  repositories: {
    snapguidist: {
      url: 'https://github.com/styleguidist/snapguidist.git',
    },
    'uui-components': {
      url: 'git@github.com:WorkWave/volo-unified-ui-components.git',
      root: 'scripts',
      deps: 'package.json',
    },
  },
  scripts: {
    'flow-typed': 'flow-typed install',
    clean: 'rm -rf coverage dist tmp',
    lint: {
      default: 'eslint src',
      'check-rules': 'eslint --print-config .eslintrc.js | eslint-config-prettier-check',
    },
    typecheck: 'flow check',
  },
}
