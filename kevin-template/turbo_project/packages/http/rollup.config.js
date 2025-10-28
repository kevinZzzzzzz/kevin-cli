import path from "path"
// import terser from "@rollup/plugin-terser"
import resolve from "@rollup/plugin-node-resolve" // 解析 node_modules 中的模块
import commonjs from "@rollup/plugin-commonjs" // 让rollup支持commonjs
import typescript from "rollup-plugin-typescript2"
import alias from "@rollup/plugin-alias" // alias 和 reslove 功能
// import eslint from "@rollup/plugin-eslint"
import clear from "rollup-plugin-clear"
import pkg from "./package.json"
import json from "@rollup/plugin-json"
import postcss from "rollup-plugin-postcss"
// import babel from "@rollup/plugin-babel"
// import replace from "@rollup/plugin-replace"
import nodePolyfills from "rollup-plugin-node-polyfills"
/**
 * 获取文件绝对路径
 * **/
const getPath = (_path) => path.resolve(__dirname, _path)

const extensions = [".js", ".jsx", ".ts", ".tsx"]
export default {
  context: 'window', // 强制 this 指向 window[1](@ref)
  // moduleContext: 'window', // 强制 module 指向 window[1](@ref)
  input: getPath("./src/index.ts"),
  output: {
    dir: getPath(pkg.main),
    format: "esm", // 输出为 ESM 格式
    name: "$xxx",
  },
  plugins: [
    nodePolyfills(),
    resolve({ jsnext: true, preferBuiltins: true, browser: true }),
    json(),
    // terser(),
    commonjs(),
    // babel({
    //   babelHelpers: "bundled", // 使用打包的 Babel 辅助方法
    //   exclude: "node_modules/**", // 排除 node_modules 中的文件
    //   presets: [
    //     [
    //       "@babel/preset-env",
    //       {
    //         targets: "> 0.25%, not dead", // 目标浏览器版本
    //       },
    //     ],
    //   ],
    //   extensions: [".js", ".ts"], // 处理 js 和 ts 文件
    // }),
    // eslint({
    //   fix: true, // 自动修复
    // }),
    clear({
      targets: ["lib", "es", "lib", "iife", "docs", "html"],
      watch: true,
    }),
    postcss({
      extensions: ['.css'],
    }),
    typescript(),
    alias({
      entries: [{ find: "@", replacement: getPath("src") }],
    }),
  ],
  // external: [
  //   "http",
  //   "https",
  //   "url",
  //   "assert",
  //   "stream",
  //   "tty",
  //   "util",
  //   "os",
  //   "fs",
  //   "zlib",
  // ],
  // treeshake: {
  //   preset: "safest",
  //   tryCatchDeoptimization: true,
  // },
}
