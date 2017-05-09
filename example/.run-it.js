module.exports = {
  settings: {
    repositoriesRoot: './.repositories',
    extensions: ['js', 'sh'],
    depsManager: 'yarn',
  },
  repositories: {
    'automation': {
      url: 'git@github.com:cef62/automation-scripts.git',
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
