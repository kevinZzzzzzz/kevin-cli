import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios"
import { message } from "antd"
import { AxiosCanceler } from "./axiosCancel"
import { showFullScreenLoading, tryHideFullScreenLoading } from "./utils"
import { messageMap } from "./message"

// const axiosCanceler = new AxiosCanceler();
// * 请求响应参数(不包含data)
interface Result {
  code: string
  msg: string
}

// * 请求响应参数(包含data)
interface ResultData<T = any> extends Result {
  data?: T
}

class RequestHttp {
  service: AxiosInstance
  baseURL: string
  timeOut: number
  token: string
  withCredentials: boolean
  constructor(
    config: AxiosRequestConfig & {
      token: string,
    }
  ) {
    this.token = config.token || ""
    this.baseURL = config.baseURL || location.origin || ""
    this.timeOut = config.timeout || 10000
    this.withCredentials = config.withCredentials || false
    this.service = axios.create({
      baseURL: this.baseURL || "",
      timeout: this.timeOut || 5000,
      withCredentials: this.withCredentials || false,
    })

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token
     */
    this.service.interceptors.request.use(
      (config: any) => {
        // * 将当前请求添加到 pending 中
        // axiosCanceler.addPending(config);
        // * 如果当前请求需要显示 loading,在api服务中通过指定的第三个参数: { headers: { showLoading: true } }来控制显示loading
        config.headers?.showLoading && showFullScreenLoading()

        return {
          ...config,
          headers: {
            ...config.headers,
            token: this.token || window.localStorage.getItem("token"),
          },
        }
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config, status } = response
        // * 在请求结束后，移除本次请求(关闭loading)
        // axiosCanceler.removePending(config);
        tryHideFullScreenLoading()
        return new Promise((resolve, reject) => {
          if (status === 200) {
            // * 如果当前请求需要显示 message,在api服务中通过指定的第三个参数: { headers: { showMessage: true } }来控制显示message
            switch (+data.code) {
              case 0: // 正常返回
                !!config.headers?.showMessage &&
                  ((data.msg && message.success(data.msg)) ||
                    (config.headers?.msgType &&
                      messageMap[config.headers?.msgType] &&
                      message.success(messageMap[config.headers?.msgType])))

                resolve(data)
                break
              // * 处理异常返回
              default: // 其余异常
                !!config.headers?.showMessage &&
                  data.msg &&
                  message.error(data.msg)
                reject(data)
                break
            }
          } else {
            reject(data)
          }
        })
      },
      async (error: AxiosError) => {
        const {
          request: { status },
        } = error
        if ([401, 403].includes(status)) {
          message.error("登录失效，请重新登录")
          setTimeout(() => {
            window.location.hash = "/login"
          }, 1000)
        }

        !!config.headers?.showMessage &&
          error.message &&
          message.error(error.message)
        tryHideFullScreenLoading()
        return Promise.reject(error)
      }
    )
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default RequestHttp
