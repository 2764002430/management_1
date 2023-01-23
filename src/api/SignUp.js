import request from '@/util/require'

export const Sign = function (_username, _pass, _checkpass, _gender) {
  return request.post('/SignUp.php', {
    username: _username,
    pass: _pass,
    checkpass: _checkpass,
    gender: _gender
  })
}
