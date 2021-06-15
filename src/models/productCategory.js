const db = require('../helpers/db')

exports.createProductCategory = (data, cb) => {
  db.query(`INSERT INTO product_category (id_product, id_category) 
  VALUES (${data.id_product}, ${data.id_category})
  `, cb)
}
