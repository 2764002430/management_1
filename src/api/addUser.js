import request from '@/util/require'

export const addUser = function (_username, _password, _gender, _level) {
  console.log(_username, _password, _gender, _level)
  return request.post('/addUser.php', {
    username: _username,
    password: _password,
    gender: _gender,
    level: _level
  })
}
