const { createTransaction, getTransaction, getDetailTransaction } = require('../controllers/transactions')

const route = require('express').Router()

route.post('/transaction', createTransaction)
route.get('/transaction', getTransaction)
route.get('/transaction/detail/:id', getDetailTransaction)

module.exports = route
