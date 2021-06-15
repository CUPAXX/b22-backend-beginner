const route = require('express').Router()
const auth = require('../middlewares/auth')

const variantsController = require('../controllers/variants')

// route.get('/sorting', variantsController.sortingVariants)
// route.get('/search', variantsController.getVariantsBySearch)
route.get('/', variantsController.getVariants)
route.post('/', auth, variantsController.createVariants)
route.put('/:id', auth, variantsController.updateVariants)
route.delete('/:id', auth, variantsController.deleteVariants)

module.exports = route
