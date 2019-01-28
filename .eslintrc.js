module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'curly': 2,
    'comma-spacing': 2,
    'comma-style': 2,
    'brace-style': 2,
    'vue/script-indent': 2,
    'max-depth': [2, 3],
    'no-magic-numbers': 2,
    'block-scoped-var': 2,
    'complexity': [2, 6],
    'no-alert': 2,
    'no-empty-function': 2,
    'no-multi-spaces': 2,
    'no-self-compare': 2,
    'no-unused-expressions': 2,
    'no-with': 2,
    'no-shadow-restricted-names': 2,
    'array-bracket-spacing': 2,
    'block-spacing': 2
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['vue', 'graphql']
}