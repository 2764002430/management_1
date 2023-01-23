import request from '@/util/require'
export const articleList = function (_page) {
  console.log(_page)
  return request.get('/articleList.php', {
    params: _page ? { page: _page } : {},
    headers: {
      'Content-Type': 'application/json', // 设置请求头请求格式为JSON
      token: self.vistorToken
    },
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  })
}
