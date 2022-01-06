import request from './request'

// 示例：GET 请求
const getData = params => {
  return request.get(
    '/getData',
    params
  )
}
// 示例：POST 请求
const postData = data => {
  return request.post(
    '/postData',
    data
  )
}

export default {
  getData,
  postData
}
