const { response } = require('../helpers/standardRes')
const { createUser, getUserByEmail } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.register = async (req, res) => {
  const result = validationResult(req)
  console.log(result)
  if (!result.isEmpty()) {
    return response(res, 400, false, result.errors[0].msg)
  }
  const data = req.body
  data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
  createUser(data, (err, results) => {
    if (!err) {
      if (results.affectedRows) {
        return response(res, 200, true, 'Register SuccesFully')
      } else {
        return response(res, 500, false, 'An error Occurred')
      }
    } else {
      return response(res, 500, false, 'An error Occurred')
    }
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body
  getUserByEmail(email, async (err, results) => {
    if (!err) {
      if (results.length < 1) return response(res, 401, false, 'wrong email or password')
      const user = results[0]
      const compare = await bcrypt.compare(password, user.password)
      if (compare) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.APP_KEY, { expiresIn: '10m' })
        return response(res, 200, true, 'Login Success', { token })
      } else {
        return response(res, 401, false, 'wrong email or password')
      }
    } else {
      return response(res, 500, false, 'An error Occurred')
    }
  })
}

// exports.deleteUser = (req, res) => {
//   getUserRole(req.authUser.id, (err, results) => {
//     if (err) {
//       return response(res, 500, false, 'Something Wrong')
//     }
//     if (results[0].role === 'Admin') {
//       const { id: stringId } = req.params
//       const id = parseInt(stringId)
//       getUserById(id, (err, results, _fields) => {
//         if (!err) {
//           if (results.length > 0) {
//             deleteUser(id, (err, results, _fields) => {
//               if (!err) {
//                 return response(res, 200, true, 'User Has Been Delete', results)
//               } else {
//                 return response(res, 500, false, 'Something Wrong')
//               }
//             })
//           } else {
//             return response(res, 400, false, 'Item Not Found')
//           }
//         } else {
//           return response(res, 500, false, 'An Error Occurred')
//         }
//       })
//     } else {
//       return response(res, 500, false, 'You are not admin can\'t do this action')
//     }
//   })
// }

// exports.getUser = (req, res) => {
//   getUser((err, results, _fields) => {
//     if (!err) {
//       return response(res, 200, true, 'List Of User', results)
//     } else {
//       return response(res, 500, false, 'An error Occurred')
//     }
//   })
// }

// exports.updateUser = (req, res) => {
//   const { id } = req.params
//   getUserById(id, async (err, results, _fields) => {
//     if (err) throw err
//     if (results.length > 0) {
//       const data = req.body
//       const newPassword = data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
//       const { name, email } = req.body
//       const updateData = { id, name, email, password: newPassword }
//       updateUser(updateData, (err, results, _fields) => {
//         if (err) throw err
//         return response(res, 200, true, 'Update SuccessFully', results)
//       })
//     } else {
//       return response(res, 400, false, 'User Not Found')
//     }
//   })
// }
