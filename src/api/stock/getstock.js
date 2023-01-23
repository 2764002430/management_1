import ts from '@/util/stockapi.js'
const token = 'b502e69e0fd483bb173536ba7f193fb68ba392a6259c1b401c353cef'
export const getstock = function (api, params, fields) {
  const obj = {
    // api_name: "daily",
    // token: "b502e69e0fd483bb173536ba7f193fb68ba392a6259c1b401c353cef",
    // params: {"ts_code": "600519.SH","start_date": "20230101","end_date": "20230122"},
    // fields: "open,high,low,close"
    api_name: api,
    token: token,
    params: params,
    fields: fields
  }
  return ts({
    method: 'post',
    url: '/',
    data: JSON.stringify(obj)
  })
}
