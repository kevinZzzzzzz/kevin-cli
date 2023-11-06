# xxx(项目名) 项目

## 项目地址
#### [xxx](项目地址): 项目地址

## 技术选型
* 框架 react V18
* 路由 react-router-dom V8
* 状态管理工具 redux+@reduxjs/toolkit
* 打包构建工具 vite + rollup
* UI框架 --

## 快速启动
- 安装依赖包
  ```
  npm install || pnpm install
  tips：
  1、每次安装依赖先查看目录文件下面的是否有lock文件（比如：package-lock、pnpm-lock等等），有的话删除后再安装
  2、每次提交代码会有eslint代码检测和提交文案检测（代码提交规范如下文所述），需要全局安装npx（命令行：npm i -g npx）
  3、有时由于网络原因安装依赖时会出现依赖脚本执行失败导致依赖安装失败，可以再install后面增加 --ignore-script
  4、建议使用pnpm，优点：(1)轻量化，(2)速度快
  ```
- 启动项目
   ```
   npm run dev || pnpm dev
   ```
- 项目打包
   ```
   npm run build || pnpm build
   ```
- 本地部署
   ```
   npm run docker || pnpm docker
   本地部署前提：本地安装docker，并且执行环境要在 bash环境！！！
   ```

# 目录介绍
```
cold-chain-web
│  .cz-config.js                       ### 提交文案规范配置文件, 在pre-commit钩子中发挥作用
│  .editorconfig                       ### 编写规范配置
│  .env.development                    ### 开发环境常量
│  .env.production                     ### 生产环境常量
│  .eslintignore                       ### eslint忽略文件
│  .eslintrc.cjs                       ### eslint规则配置文件
│  .gitignore                          ### 忽略文件
│  .npmignore
│  commitlint.config.ts                ### 校验提交信息配置文件, 在commit-msg钩子中发挥作用
│  index.html                          ### 入口html
│  package.json                        ### 项目依赖管理
│  README.md                           ### help
│  tsconfig.json
│  vite.config.ts                      ### 打包构建配置
│  Dockerfile                          ### 测试&生产dockerfile
│  nginx.conf                          ### 测试&生产nginx配置
├─.bin                                 ### 命令执行文件
├─.husky                               ### 代码提交钩子配置
└─src
    │  App.tsx
    │  main.tsx                        ### 入口文件
    ├─Api                              ### 接口配置文件
    ├─assets                           ### 静态资源
    ├─component                        ### 全局组件
    ├─hooks                            ### 自定义hooks
    ├─Http                             ### 网络请求拦截器
    ├─Layout                           ### 页面布局
    ├─Pages                            ### 页面管理
    │  component                       ### 页面组件
    ├─router                           ### 路由管理
    ├─store                            ### 状态管理
    ├─type
    │  common.ts                       ### 常量定义
    │  type.d.ts                       ### 类型定义
    └─utils                            ### 工具库

```
## commit 提交规范
提交代码必须按照规范提交！！！
```
  type

  feat：新功能（feature）
  fix：修补bug
  docs：文档（documentation）
  style： 格式（不影响代码运行的变动）
  refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  test：增加测试
  chore：构建过程或辅助工具的变动

  ege:   git commit -m "fix: 权限管理"
```
