/*
 * @Author: kevinZzzzzz
 * @Date: 2023-05-19 09:55:35
 * @version:
 * @LastEditors: kevinZzzzzz
 * @LastEditTime: 2023-06-02 14:48:50
 * @Description: API请求封装
 * @FilePath: \vue-ts-vite\src\Api\index.ts
 */
import http from '@/Http'
import { type AxiosResponse } from 'axios'
// 设置代理
const setProxy = (url: string): string => {
  return !import.meta.env.PROD ? '/api' + url : url
}
console.log(import.meta.env, '环境变量')

export default {
  /*
    for example：
  */
  async xxx (data: any = {}): Promise<AxiosResponse<any, any>> {
    return await http.post(setProxy('/xxx'), { data }, true, true)
  }
}
