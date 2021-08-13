const { createChat, deleteChat, getUserChat, getAllUserChat } = require('../controllers/chat')

const route = require('express').Router()

route.post('/chat', createChat)
route.delete('/chat/:id', deleteChat)
route.get('/chat', getUserChat)
route.get('/chat/all', getAllUserChat)

module.exports = route
