const { getUser, updateUser, changePasswordUser } = require('../controllers/profile')

const route = require('express').Router()
const itemPicture = require('../helpers/upload').single('picture')

route.get('/profile', getUser)
route.patch('/profile', itemPicture, updateUser)
// route.patch('/profile', updateUserPartially)
route.put('/profile/change_password', changePasswordUser)

module.exports = route
