// exports.response = (res, status = 200, success = true, message = '', results, pageInfo) => {
//   return res.status(status).json({
//     success,
//     message,
//     results,
//     pageInfo
//   })
// }

exports.response = (res, status = 200, success = true, message = '', results, pageInfo) => {
  const returnData = {
    success,
    message,
    pageInfo
  }
  if (status >= 400) {
    returnData.success = false
  }
  if (results !== null) {
    returnData.results = results
  }
  return res.status(status).json(returnData)
}
