# 系统模板

## 项目地址

#### [system-template](https://git.sharing8.cn/zhangyingjie/system-template.git): https://git.sharing8.cn/zhangyingjie/system-template.git

## 技术选型

- 框架 vue3
- 状态管理 pinia
- 组件库 element-plus
- 路由 vue-router4
- 打包构建工具 vite

## 快速启动

- 安装依赖包

```
 pnpm install
 tips：
 1、每次安装依赖先查看目录文件下面的是否有lock文件（比如：package-lock、pnpm-lock等等），有的话删除后再安装
 2、每次提交代码会有eslint代码检测和提交文案检测（代码提交规范如下文所述），需要同时全局安装npx（命令行：npm i -g npx）
 3、有时由于网络原因安装依赖时会出现依赖脚本执行失败导致依赖安装失败，可以再install后面增加 --ignore-script
 4、可以用npm 、yarn，建议使用pnpm，优点：(1)轻量化，(2)速度快
```

- 启动项目

```
pnpm dev
```

- 项目打包

```
pnpm build:dev || pnpm build:prod
```

# 目录介绍

```
system-template
├── .eslintrc.cjs                  # ESLint配置文件
├── commitlint.config.cjs          # 提交信息校验配置
├── lint-staged.config.cjs         # lint-staged配置
├──.prettierrc.cjs                 # Prettier配置文件
├──.stylelintrc.cjs                # Stylelint配置文件
├── postcss.config.cjs             # PostCSS配置文件
├──.env.development                # 开发环境变量配置
├──.env.production                 # 生产环境变量配置
├──.env.test                       # 测试环境变量配置
├──.env                            # 环境变量配置模板
├── .gitignore                     # Git忽略文件配置
├──.husky                          # Husky配置目录
│   ├── commit-msg                 # 提交信息校验脚本
│   └── pre-commit                 # 提交前校验脚本
├── README.md                      # 项目说明文档
├── build                          # vite构建相关配置目录
│   ├── getEnv.ts                  # 环境变量处理工具
│   ├── plugins.ts                 # Vite插件配置
│   └── proxy.ts                   # 代理配置文件
├── index.html                     # 项目入口HTML文件
├── package.json                   # 项目依赖配置文件
├── pnpm-lock.yaml                 # pnpm锁定文件
├── public                         # 静态资源目录
├── src                            # 项目源代码目录
│   ├── App.vue                    # 项目根组件
│   ├── api                        # API接口管理目录
│   │   ├── config                 # API配置
│   │   │   └── servicePort.ts     # 服务端口配置
│   │   ├── helper                 # API辅助工具
│   │   │   ├── axiosCancel.ts     # 请求取消处理
│   │   │   └── checkStatus.ts     # 状态码处理
│   │   ├── index.ts               # API实例配置文件
│   │   ├── interface              # 接口类型定义
│   │   │   └── index.ts           # 接口类型主文件
│   │   └── modules                # 模块化API
│   ├── assets                     # 静态资源目录
│   │   ├── fonts                  # 字体文件
│   │   ├── iconfont               # 图标字体
│   │   │   ├── iconfont.scss      # 图标字体样式
│   │   │   └── iconfont.ttf       # 图标字体文件
│   │   ├── icons                  # SVG图标
│   │   ├── images                 # 图片资源
│   │   ├── json                   # JSON数据文件
│   │   └── mock                   # Mock数据
│   │       └── Easy-Mock-API.zip  # EasyMock API数据包
│   ├── components                 # 公共组件目录
│   │   ├── ECharts                # ECharts图表组件
│   │   ├── ErrorMessage           # 错误信息组件
│   │   ├── Grid                   # 网格布局组件
│   │   ├── ImportExcel            # Excel导入组件
│   │   ├── Loading                # 加载组件
│   │   └── locale                 # 组件本地化配置
│   │       ├── en.ts              # 英文语言包
│   │       └── zh.ts              # 中文语言包
│   ├── config                     # 项目配置目录
│   │   ├── index.ts               # 配置主文件
│   │   └── nprogress.ts           # 进度条配置
│   ├── directives                 # 自定义指令目录
│   │   ├── index.ts               # 指令主文件
│   │   └── modules                # 指令模块
│   ├── enums                      # 枚举定义目录
│   │   └── httpEnum.ts            # HTTP相关枚举
│   ├── hooks                      # 组合式函数目录
│   │   ├── interface              # 类型定义
│   │   │   └── index.ts           # 类型定义主文件
│   ├── languages                  # 多语言配置目录
│   │   ├── index.ts               # 多语言主文件
│   │   └── modules                # 语言模块
│   ├── layouts                    # 布局组件目录
│   │   ├── LayoutClassic          # 经典布局
│   │   ├── LayoutColumns          # 列式布局
│   │   ├── LayoutTransverse       # 横向布局
│   │   ├── LayoutVertical         # 纵向布局
│   │   ├── components             # 布局子组件
│   │   ├── index.vue              # 布局主文件
│   │   ├── indexAsync.vue         # 异步布局主文件
│   │   └── locale                 # 语言包
│   ├── main.ts                    # 项目入口文件
│   ├── routers                    # 路由配置目录
│   │   ├── index.ts               # 路由主文件
│   │   └── modules                # 路由模块
│   │       ├── dynamicRouter.ts   # 动态路由配置
│   │       └── staticRouter.ts    # 静态路由配置
│   ├── stores                     # 状态管理目录
│   │   ├── helper                 # 状态管理辅助工具
│   │   │   └── persist.ts         # 持久化配置
│   │   ├── index.ts               # 状态管理主文件
│   │   ├── interface              # 状态管理类型定义
│   │   │   └── index.ts           # 状态管理类型主文件
│   │   └── modules                # 状态管理模块
│   ├── styles                     # 样式目录
│   │   ├── common.scss            # 公共样式
│   │   ├── element-dark.scss      # Element Plus 暗黑主题样式
│   │   ├── element.scss           # Element Plus 默认样式
│   │   ├── reset.scss             # 样式重置
│   │   ├── theme                  # 主题配置
│   │   └── var.scss               # 全局变量
│   ├── typings                    # 类型定义目录
│   │   ├── global.d.ts            # 全局类型定义
│   │   ├── utils.d.ts             # 工具类型定义
│   │   └── window.d.ts            # Window 对象类型扩展
│   ├── utils                      # 工具函数目录
│   ├── views                      # 页面视图目录
│   │   ├── locale                 # 多语言示例页面
│   │   │   ├── en.ts              # 英文语言包
│   │   │   └── zh.ts              # 中文语言包
│   └── vite-env.d.ts              # Vite 环境变量类型定义
├── tsconfig.json                  # TypeScript 配置文件
└── vite.config.ts                 # Vite 配置文件
```

## commit 提交规范

本地初始化husky

```
  pnpm prepare
```

```
  type

  feat：新功能（feature）
  fix：修补bug
  docs：文档（documentation）
  style： 格式（不影响代码运行的变动）
  refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  test：增加测试
  chore：构建过程或辅助工具的变动

  ege:   git commit -m "fix: xxxxxx --user=xxx --story=xxx" || git commit -m "fix: xxxxx --user=xxx --bug=xxx"
```
