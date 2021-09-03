const { response } = require('../helpers/standardRes')
const { createUser, getUserByEmail } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.register = async (req, res) => {
  // const result = validationResult(req)
  // if (!result.isEmpty()) {
  //   return response(res, 400, false, result.errors[0].msg)
  // }
  const email = req.body.email
  const password = req.body.password
  const resPassword = await bcrypt.hash(password, await bcrypt.genSalt())
  const data = { email, password: resPassword }
  await createUser(data)
  return response(res, 200, true, 'Register SuccesFully, You can Login Now')
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const results = await getUserByEmail(email)
  if (results.length < 1) {
    return response(res, 401, false, 'email not found')
  }
  const user = results[0]
  const compare = await bcrypt.compare(password, user.password)
  if (compare) {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.APP_KEY)
    return response(res, 200, true, 'Login Success', { token })
  } else {
    return response(res, 401, false, 'wrong email or password')
  }
}
