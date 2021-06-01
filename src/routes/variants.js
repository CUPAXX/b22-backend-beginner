const route = require('express').Router()

const variantsController = require('../controllers/variants')
route.get('/sorting', variantsController.sortingVariants)
route.get('/search', variantsController.getVariantsBySearch)
route.get('/', variantsController.getVariants)
route.post('/', variantsController.createVariants)
route.put('/:id', variantsController.updateVariants)
route.delete('/:id', variantsController.deleteVariants)

module.exports = route
