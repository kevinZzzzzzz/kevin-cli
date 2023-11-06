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
app.config.errorHandler = (err, vm, info) => {
  console.error()
}
app.use(store).use(router).mount('#app')
