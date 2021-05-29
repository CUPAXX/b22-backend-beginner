const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'coffeeShop',
  user: 'root',
  password: ''
})

connection.connect()
module.exports = connection
