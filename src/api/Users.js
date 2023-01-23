import request from '@/util/require'

export const Users = function (pageData) {
  return request.get('/userList.php', {
    params: {
      page: pageData.page,
      limit: pageData.limit
    },
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
