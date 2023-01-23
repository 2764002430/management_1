import axios from 'axios'

const request = axios.create({
  // 通用请求的地址前缀 根路径
  baseURL: 'http://127.0.0.1/users',
  timeout: 500
})
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default request
