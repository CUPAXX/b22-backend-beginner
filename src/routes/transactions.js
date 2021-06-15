const { createTransaction, getTransaction, getDetailTransaction } = require('../controllers/transactions')

const route = require('express').Router()

route.post('/transaction', createTransaction)
route.get('/transaction', getTransaction)
route.get('/transaction/detail', getDetailTransaction)

module.exports = route
