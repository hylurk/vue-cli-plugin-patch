import { AxiosPromise } from 'axios'
import request from './request'

// 示例：GET 请求
const getData = <T>(params: Record<string, unknown>): AxiosPromise<T> => {
  return request.get(
    '/getData',
    params
  )
}
// 示例：POST 请求
const postData = <T>(data: Record<string, unknown>): AxiosPromise<T> => {
  return request.post(
    '/postData',
    data
  )
}

export default {
  getData,
  postData
}
