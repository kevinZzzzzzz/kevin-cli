/*
 * @Author: kevinZzzzzz
 * @Date: 2023-06-02 10:58:36
 * @version:
 * @LastEditors: kevinZzzzzz
 * @LastEditTime: 2023-06-02 11:36:18
 * @Description: 入口ts
 * @FilePath: \vue-ts-vite\src\main.ts
 */
import { createApp } from 'vue'
import './style.less'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from './router/index'
import api from '@/Api'
import App from './App.vue'

declare module 'vue' {
  export interface ComponentCustomProperties {
    $api: any
  }
}
const store = createPinia().use(piniaPluginPersist)
const app = createApp(App)
app.config.globalProperties.$api = { ...api }
// 全局错误拦截
app.config.errorHandler = (err: any, vm: any, info: any) => {
  console.error()
}
app.use(store).use(router).mount('#app')
