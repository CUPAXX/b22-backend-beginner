const { response } = require('./standardRes')
exports.validationInteger = (res, data, fields, cb) => {
  if (data) {
    data = parseInt(data)
    if (data < 1) {
      return response(res, 400, false, `${fields} at Least 1`)
    } else {
      cb()
    }
  }
}
