import request from '@/util/require'

export const isLogin = (_username, _pass) => {
  return request.post('/Login.php', {
    username: _username,
    pass: _pass
  })
}
