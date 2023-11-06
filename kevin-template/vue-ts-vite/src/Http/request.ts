import axios from 'axios'

class HttpRequest {
  constructor () {}
  /*
    isShowToast: 是否显示接口返回信息
    isShowLoading： 是否显示接口加载状态
  */
  async get (url: string, isShowToast = false, isShowLoading = false) {
    return await this.request({ method: 'GET', url }, isShowToast, isShowLoading)
  }

  async post (url: string, data: any, isShowToast = false, isShowLoading = false) {
    return await this.request({ method: 'POST', url, ...data }, isShowToast, isShowLoading)
  }

  async request (config: any, isShowToast = false, isShowLoading = false) {
    const instance = axios.create()
    this.interceptor(instance, isShowToast, isShowLoading)
    return await instance(config)
  }

  interceptor (instance: any, isShowToast = false, isShowLoading = false) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: any) => {
        config.baseURL = location.origin
        config.timeout = 5000; // 请求超时
        return config
      },

      (error: any) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (response: any) => {
        const { status, data } = response
        return new Promise((resolve, reject) => {
          if (status === 200) {
            switch(+data.code) {
              case 0:
                resolve(data);
                break;
              default: // 其余异常
                reject(response);
                break;
            }
          } else {
            reject(response);
          }
        })
      },
      (error: any) => {
        const {
          response: { status }
        } = error
        // if (status === 403) {
        //   window.location.hash = '#/home'
        // }
        return new Promise((resolve, reject) => {
          reject(error);
        })
      }
    )
  }
}

export default HttpRequest
