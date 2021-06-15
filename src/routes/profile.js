const { getUser, updateUser, updateUserPartially, changePasswordUser } = require('../controllers/profile')

const route = require('express').Router()

route.get('/profile', getUser)
route.put('/profile', updateUser)
route.patch('/profile', updateUserPartially)
route.put('/profile/change_password', changePasswordUser)

module.exports = route
