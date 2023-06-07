/*
 * @Author: kevinZzzzzz
 * @Date: 2023-05-11 09:30:47
 * @version:
 * @LastEditors: kevinZzzzzz
 * @LastEditTime: 2023-06-02 11:17:46
 * @Description: pinia状态管理器
 * @FilePath: \vue-ts-vite\src\store\index.ts
 */
import { defineStore } from 'pinia'

/*
  for example
*/
export const vueStore = defineStore({
  id: 'vueStore',
  // 状态持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'vue',
        storage: localStorage
      }
    ]
  },
  state: () => {
    return {
      xxx: {} as any
    }
  },
  getters: {},
  actions: {}
})
