/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    'shared-node-browser': true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['node_modules', 'dist'],
  rules: {
    'no-undef': 'off',
  },
};
