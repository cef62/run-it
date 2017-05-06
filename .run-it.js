module.exports = {
  settings: {
    repositoriesRoot: './.repositories',
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
    clean: 'rm -rf coverage dist tmp',
    lint: {
      default: {
        script: 'eslint src',
        description: 'Run linter on source code',
      },
    },
    typecheck: 'flow check',
    utils: {
      common: {
        say: 'echo you said: ',
      }
    },
  },
}
