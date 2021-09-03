const db = require('../helpers/db')
const { promisify } = require('util')
const execPromise = promisify(db.query).bind(db)

exports.getCategory = () => {
  return execPromise('SELECT id, categoryName FROM category'
  )
}

exports.createCategory = (data) => {
  return execPromise(`INSERT INTO category (categoryName) 
  VALUES ('${data.name}')
  `)
}

exports.getCategoryById = (id) => {
  return execPromise(`SELECT * FROM category WHERE id=${id}`
  )
}

// exports.getCategoryByCondition = (cond) => {
//   return execPromise(`SELECT category.id, category.categoryName, category.createAt FROM category WHERE category.categoryName LIKE '%${cond}%'
//   `)
// }

exports.updateCategory = (data) => {
  return execPromise(`UPDATE category SET categoryName='${data.name}', 
  updatedAt='${data.updatedAt}' WHERE id=${data.id}`
  )
}

exports.deleteCategory = (id) => {
  return execPromise('DELETE FROM category WHERE id=?', [id])
}

exports.getCategoryItem = (id) => {
  return execPromise(`SELECT item.id, item.picture, item.productName, item.price FROM item 
  LEFT JOIN product_category ON product_category.id_product = item.id 
  WHERE product_category.id_category = ?`
  , [id])
}
