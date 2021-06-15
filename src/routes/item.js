const route = require('express').Router()
const auth = require('../middlewares/auth')
const itemPicture = require('../helpers/upload').single('picture')
const { checkSchema } = require('express-validator')

const itemController = require('../controllers/item')

route.post('/', auth, itemPicture, checkSchema(require('../helpers/validationSchema/createItem')), itemController.createItem)
route.get('/', itemController.getItem)
route.get('/:id', itemController.getDetailItem)
route.patch('/:id', auth, itemController.updateItemPartially)
route.put('/:id', auth, itemPicture, checkSchema(require('../helpers/validationSchema/createItem')), itemController.updateItem)
route.delete('/:id', auth, itemController.deleteItem)

module.exports = route
