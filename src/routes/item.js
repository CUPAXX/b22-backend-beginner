const route = require('express').Router()

const itemController = require('../controllers/item')
route.get('/sorting', itemController.sortingItem)
route.get('/search', itemController.getItemBySearch)
route.post('/', itemController.createItem)
route.get('/', itemController.getItem)
route.get('/:id', itemController.getDetailItem)
route.patch('/:id', itemController.updateItemPartially)
route.put('/:id', itemController.updateItem)
route.delete('/:id', itemController.deleteItem)

module.exports = route
