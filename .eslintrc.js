module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'prettier',
    '@typescript-eslint'
  ],
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.ts'],
      }
    }
  },
  rules: {
    'quotes': [2, 'single'],
    'no-useless-escape': 0,
    '@typescript-eslint/no-use-before-define': 0
  }
};