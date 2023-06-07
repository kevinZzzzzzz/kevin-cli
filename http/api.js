const axios = require('axios')
const ora = require("ora");
// axios 拦截器
class HttpRequest {
  constructor() {
    this.spinner = null // 加载动效
  }
  async get(url) {
    this.spinner = ora();
    this.spinner.start();
    this.spinner.color = "green";
    this.spinner.text = "请求远程仓库中。。。";
    return this.request({method: "GET", url})
  }
  async request(config) {
    const instance = axios.create()
    this.interceptor(instance)
    return await instance(config)
  }

  interceptor(instance) {
    instance.interceptors.request.use(
      (config) => {
        // config.basuURL = 
        return config
      },
      async (error) => {
        this.spinner.fail();
        return await Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      async (response) => {
        this.spinner.text = "加载完成";
        this.spinner.succeed();
        return await Promise.resolve(response)
      },
      async (error) => {
        this.spinner.fail();
        return await Promise.reject(error)
      }
    )
  }
}

const http = new HttpRequest()

/**
 * 获取模板
 * @returns Promise 仓库信息
 */
async function getKevinVueCliInfo() {
  return http.get("https://api.github.com/repos/kevinZzzzzzz/kevinVue-cli")
}
/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @returns Promise 版本信息
 */
async function getKevinVueTagsByRepo(repo) {
  // return axios.get(`https://api.github.com/repos/kevinZzzzzzz/kevinVue-cli/${repo}/tags`);
  return axios.get('https://api.github.com/repos/kevinZzzzzzz/kevinVue-cli/tags');
}

module.exports = {
  getKevinVueCliInfo,
  getKevinVueTagsByRepo
}