const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  const data = {
    success: true,
    message: 'Backend Running Well!'
  }
  return res.json(data)
})

app.listen(8080, () => {
  console.log('App running on port 8080')
})

const itemRoute = require('./src/routes/item')
app.use('/item', itemRoute)

const categoryRoute = require('./src/routes/category')
app.use('/category', categoryRoute)

const variantsRoute = require('./src/routes/variants')
app.use('/variants', variantsRoute)
