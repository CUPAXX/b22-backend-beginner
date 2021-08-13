const { createChat, deleteChat, getUserChat, getAllUserChat, searchUser } = require('../controllers/chat')

const route = require('express').Router()

route.post('/chat', createChat)
route.delete('/chat/:id', deleteChat)
route.get('/chat', getUserChat)
route.get('/chat/all', getAllUserChat)
route.get('/chat/search', searchUser)

module.exports = route
