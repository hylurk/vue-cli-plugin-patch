import axios from 'axios'

class HttpRequest {
  constructor () {
    // baseURL 设置
    this.baseURL = process.env.NODE_DEV === 'production' ? '/' : 'http://localhost:9000'
    // 请求超时时间 10s
    this.timeout = 10000
    // 是否允许跨域，默认 false ，会对是否携带 cookie 有影响
    this.withCredentials = true
    // post 请求数据格式，默认为 'application/x-www-form-urlencoded'
    this.contentType = 'application/json;charset=UTF-8'
  }

  // 设置拦截器
  setInterceptors (instance) {
    // 请求拦截器，可自行添加一些认证的信息
    instance.interceptors.request.use(config => {
      return config
    })
    // 响应拦截器，可根据自身需求更改
    instance.interceptors.response.use(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data) // 处理成功情况
      } else {
        return Promise.reject(res.message) // 处理失败情况
      }
    }, err => {
      // 统一错误码处理
      switch (err.response.status) {
        case '401':
          break
        default:
          break
      }
    })
  }

  mergeOptions (options = {}) {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        post: {
          'Content-Type': this.contentType
        }
      },
      ...options
    }
  }

  request (options) {
    // 每个实例的拦截器与其他实例无关，可以对每次请求单独做配置
    const instance = axios.create()
    this.setInterceptors(instance)
    const allOptions = this.mergeOptions(options)
    return instance(allOptions)
  }

  get (url, params) {
    return this.request({
      method: 'get',
      url,
      ...params
    })
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}

export default new HttpRequest()
