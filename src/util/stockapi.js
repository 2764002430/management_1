import axios from 'axios'

const ts = axios.create({
  // 通用请求的地址前缀 根路径
  baseURL: 'https://api.tushare.pro/',
  timeout: 500
})
ts.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

export default ts
