const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('./src/middlewares/auth')
require('dotenv').config()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origins: 'https://localhost:3000'
  }
})

const { APP_UPLOAD_ROUTE, APP_UPLOAD_PATH, PORT } = process.env

io.on('connection', () => {
  console.log('socket connection is exist')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(APP_UPLOAD_ROUTE, express.static(APP_UPLOAD_PATH))
const socket = require('./src/middlewares/socket')
app.use(socket(io))
// io.on('connection', (socket) => {
//   console.log(socket.id)
// })

app.get('/', (req, res) => {
  const data = {
    success: true,
    message: 'Backend Running Well!'
  }
  return res.json(data)
})

server.listen(PORT || 8080, () => {
  console.log('App running on port 8080')
})

const itemRoute = require('./src/routes/item')
app.use('/item', itemRoute)

const categoryRoute = require('./src/routes/category')
app.use('/category', categoryRoute)

const variantsRoute = require('./src/routes/variants')
app.use('/variants', variantsRoute)

const authRoute = require('./src/routes/auth')
app.use('/auth', authRoute)

const transactionRoute = require('./src/routes/transactions')
app.use('/private', auth, transactionRoute)

const profileRoute = require('./src/routes/profile')
app.use('/private', auth, profileRoute)

const chatRoute = require('./src/routes/chat')
app.use('/private', auth, chatRoute)
