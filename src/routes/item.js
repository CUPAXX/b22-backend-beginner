const route = require('express').Router()

const itemController = require('../controllers/item')
route.get('/order', itemController.orderItem)
route.post('/', itemController.createItem)
route.get('/', itemController.getItem)
route.get('/:id', itemController.getDetailItem)
route.patch('/:id', itemController.updateItemPartially)
route.put('/:id', itemController.updateItem)
route.delete('/:id', itemController.deleteItem)

module.exports = route
