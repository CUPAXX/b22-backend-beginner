const { getUserById, updateUser, updateUserPartial, changePasswordUser, updateUser2 } = require('../models/user')
const { response } = require('../helpers/standardRes')
const bcrypt = require('bcrypt')
const { APP_URL } = process.env

exports.getUser = (req, res) => {
  getUserById(req.authUser.id, (err, results, _fields) => {
    if (!err) {
      const data = {
        id: '',
        userName: '',
        lastName: '',
        firstName: '',
        picture: '',
        email: '',
        address: '',
        ...results[0]
      }
      const pic = data
      pic.picture = `${APP_URL}${pic.picture}`
      return response(res, 200, true, 'current user', data)
    } else {
      return response(res, 500, false, 'An error Occurred')
    }
  })
}

exports.updateUser = (req, res) => {
  getUserById(req.authUser.id, async (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        req.body.picture = req.file ? `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}` : null
        if (req.body.picture !== null) {
          const { userName, email, address, firstName, lastName, picture, phoneNumber } = req.body
          const updateData = { id: req.authUser.id, userName, email, address, firstName, lastName, picture, phoneNumber }
          updateUser2(updateData, (err, results) => {
            if (!err) {
              return response(res, 200, true, 'Update SuccessFully', results)
            } else {
              return response(res, 500, false, 'An error Occurred')
            }
          })
        } else {
          const { userName, email, address, firstName, lastName, phoneNumber } = req.body
          const updateData = { id: req.authUser.id, userName, email, address, firstName, lastName, phoneNumber }
          updateUser(updateData, (err, results) => {
            if (!err) {
              return response(res, 200, true, 'Update SuccessFully', results)
            } else {
              return response(res, 500, false, 'An error Occurred')
            }
          })
        }
      } else {
        return response(res, 500, false, 'An error Occurred')
      }
    } else {
      return response(res, 500, false, 'An error Occurred')
    }
  })
}

exports.updateUserPartially = (req, res) => {
  getUserById(req.authUser.id, (err, results, _fields) => {
    const key = Object.keys(req.body)
    const firstColumn = key[0]
    const updateData = { id: req.authUser.id, [firstColumn]: req.body[firstColumn] }
    if (!err) {
      if (results.length > 0) {
        if (key.length > 1) {
          return response(res, 400, false, 'System Only Need 1 Column')
        } else {
          updateUserPartial(updateData, (err, results, _fields) => {
            if (!err) {
              return response(res, 200, true, 'Update Success', results)
            } else {
              return response(res, 500, false, 'An Error Occurred')
            }
          })
        }
      } else {
        return response(res, 400, false, 'An Error Occurred')
      }
    } else {
      return response(res, 500, false, 'An Error Occurred')
    }
  })
}

exports.changePasswordUser = (req, res) => {
  getUserById(req.authUser.id, async (err, results, _fields) => {
    if (!err) {
      const data = req.body
      const newPassword = data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
      const updateData = { id: req.authUser.id, password: newPassword }
      changePasswordUser(updateData, (err, results) => {
        if (!err) {
          return response(res, 200, true, 'change password Success', results)
        } else {
          return response(res, 500, false, 'An Error Occurred')
        }
      })
    } else {
      return response(res, 500, false, 'An Error Occurred')
    }
  })
}
