import request from '@/util/require'

export const subUser = function (id) {
  return request.post('/subUser.php', {
    id
  })
}
