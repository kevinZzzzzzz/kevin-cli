module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    "@typescript-eslint/no-explicit-any": "OFF",
    "@typescript-eslint/no-empty-function": "OFF",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-vars": "off"
  },
}