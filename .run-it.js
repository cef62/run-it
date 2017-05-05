module.exports = {
  config: {
    repositoriesRoot: './tmp',
  },
  repositories: {
    snapguidist: {
      url: 'https://github.com/styleguidist/snapguidist.git',
    },
    'uui-components': {
      url: 'git@github.com:WorkWave/volo-unified-ui-components.git',
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
