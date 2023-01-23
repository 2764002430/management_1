import request from '@/util/require'

export const reUser = function (_id, _username, _password, _gender, _level) {
  console.log(_id, _username, _password, _gender, _level)
  return request.post('/reUser.php', {
    id: _id,
    username: _username,
    password: _password,
    gender: _gender,
    level: _level
  })
}
