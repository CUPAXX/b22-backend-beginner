const { register, login } = require('../controllers/auth')

const route = require('express').Router()
// const auth = require('../middlewares/auth')
const { checkSchema } = require('express-validator')

// route.get('/', getUser)
route.post('/register', checkSchema(require('../helpers/validationSchema/register')), register)
route.post('/login', login)
// route.put('/:id', updateUser)
// route.delete('/:id', auth, deleteUser)

module.exports = route
