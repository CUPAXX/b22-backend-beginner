const db = require('../helpers/db')

exports.getCategory = (cb) => {
  db.query('SELECT id, categoryName FROM category'
    , cb)
}

exports.createCategory = (data, cb) => {
  db.query(`INSERT INTO category (categoryName) 
  VALUES ('${data.name}')
  `, cb)
}

exports.getCategoryById = (id, cb) => {
  db.query(`SELECT * FROM category WHERE id=${id}`
    , cb)
}

exports.getCategoryByCondition = (cond, cb) => {
  db.query(`SELECT category.id, category.categoryName, category.createAt FROM category WHERE category.categoryName LIKE '%${cond}%'
  `, cb)
}

exports.updateCategory = (data, cb) => {
  db.query(`UPDATE category SET categoryName='${data.name}', 
  updatedAt='${data.updatedAt}' WHERE id=${data.id}`
  , cb)
}

exports.deleteCategory = (id, cb) => {
  db.query('DELETE FROM category WHERE id=?', [id], cb)
}

exports.getCategoryItem = (id, cb) => {
  db.query(`SELECT item.id, item.picture, item.productName, item.price FROM item 
  LEFT JOIN product_category ON product_category.id_product = item.id 
  WHERE product_category.id_category = ?`
  , [id], cb)
}
