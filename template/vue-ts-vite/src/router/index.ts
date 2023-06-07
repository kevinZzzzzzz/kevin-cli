/*
 * @Author: kevinZzzzzz
 * @Date: 2023-05-19 16:14:40
 * @version:
 * @LastEditors: kevinZzzzzz
 * @LastEditTime: 2023-06-02 11:40:14
 * @Description: 路由配置
 * @FilePath: \vue-ts-vite\src\router\index.ts
 */
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: ''
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '',
          requireAuth: false // 是否需要登录校验
        },
        component: async () => await import(/* webpackChunkName: "home" */ '@/pages/home/index.vue')
      }
    ]
  },
  {
    path: '/:notFoundPath',
    redirect: '/404'
  },
  {
    path: '/404',
    meta: {
      title: '404',
      requireAuth: false
    },
    component: async () => await import(/* webpackChunkName: "404" */ '@/pages/404/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(''),
  routes
})

router.beforeEach((to: any, from: any, next: any) => {
  next()
})
export default router
