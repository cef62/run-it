module.exports = {
  plugins: ['flowtype', 'prettier'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
  ],
  env: {
    jest: true,
    jasmine: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      modules: true,
    },
  },
  rules: {
    'prefer-arrow-callback': 0,
    'import/first': 0,
    'prettier/prettier': [
      'error',
      { trailingComma: 'all', singleQuote: true, semi: false },
    ],
  },
}
