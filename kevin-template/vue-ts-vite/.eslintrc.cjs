module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [ // 继承扩展一些第三方规则库，后续如果出现下面rules之外的规则校验不通过时，可以适当往下面rules中添加再禁掉
    'plugin:vue/recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  // 0: off 1: warn 2 error
  rules: {
    "no-undef": 0, // 不能有未定义的变量
    "no-alert": "error", // 禁止使用alert
    "no-empty": "error",// 是否块语句中的内容不能为空
    "no-func-assign": "error",// 是否禁止重复的函数声明
    "no-const-assign": "error",// 是否禁止修改const声明的变量
    "no-var": "error", // 是否不能使用var声明变量
    'vue/multi-word-component-names': 'off', // 关闭组件命名规则
    'vue/no-v-model-argument': 'off', // 禁止v-model带参
    "@typescript-eslint/no-explicit-any": "off", // 是否禁用 any
    "@typescript-eslint/no-empty-function": "error", // 是否禁用 空函数
    "@typescript-eslint/ban-types": "off", // 是否禁止特定类型（抽象定义）
    "@typescript-eslint/no-unused-vars": "off", // 是否禁止定义变量未使用
    "@typescript-eslint/prefer-const": "off", // 是否禁止偏好const
    "@typescript-eslint/no-var-requires": 0 // 是否禁止使用require定义依赖
  },
}