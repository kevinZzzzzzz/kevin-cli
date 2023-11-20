/* eslint-disable no-undef */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    './.eslintrc-auto-import.json',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  // 0: off 1: warn 2 error
  rules: {
    "no-undef": 0, // 不能有未定义的变量
    "no-alert": "error", // 禁止使用alert
    "no-empty": "error",// 是否块语句中的内容不能为空
    "no-func-assign": "error",// 是否禁止重复的函数声明
    "no-const-assign": "error",// 是否禁止修改const声明的变量
    "no-var": "error", // 是否不能使用var声明变量
    "react-refresh/only-export-components": "off", // 是否禁止只导出组件
    "@typescript-eslint/no-explicit-any": "OFF", // 是否禁用 any
    "@typescript-eslint/no-empty-function": "error", // 是否禁用 空函数
    "@typescript-eslint/ban-types": "off", // 是否禁止特定类型（抽象定义）
    "@typescript-eslint/no-unused-vars": "off", // 是否禁止定义变量未使用
    "@typescript-eslint/prefer-const": "off", // 是否禁止偏好const
    "react-hooks/exhaustive-deps": 'Off'
  },
}
