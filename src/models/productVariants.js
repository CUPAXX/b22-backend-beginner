const db = require('../helpers/db')

exports.createProductVariants = (data, cb) => {
  db.query(`INSERT INTO product_variants (id_product, id_variants) 
  VALUES (${data.id_product}, ${data.id_variants})
  `, cb)
}
