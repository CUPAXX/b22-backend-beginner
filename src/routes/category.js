const route = require('express').Router()
const auth = require('../middlewares/auth')

const categoryController = require('../controllers/category')

// route.get('/search', categoryController.getCategoryBySearch)
route.get('/', categoryController.getCategory)
route.post('/', auth, categoryController.createCategory)
route.put('/:id', auth, categoryController.updateCategory)
route.delete('/:id', auth, categoryController.deleteCategory)
route.get('/:id/item', categoryController.getCategoryItem)

module.exports = route
