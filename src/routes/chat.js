const { createChat, deleteChat, getUserChat, getAllUserChat, searchUser, createUpload } = require('../controllers/chat')

const route = require('express').Router()
const itemPicture = require('../helpers/upload')

route.post('/chat', createChat)
route.post('/chat/upload', itemPicture, createUpload)
route.delete('/chat/:id', deleteChat)
route.get('/chat', getUserChat)
route.get('/chat/all', getAllUserChat)
route.get('/chat/search', searchUser)

module.exports = route
