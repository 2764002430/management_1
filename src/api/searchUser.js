import request from '@/util/require'

export const search = function (search, pageData) {
  return request.get('/searchUser.php', {
    params: {
      page: pageData.page,
      limit: pageData.limit,
      Field: search.field,
      key: search.input
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
