const db = require('../helpers/db')

exports.getCategory = (cb) => {
  db.query('SELECT categoryName FROM category'
    , cb)
}

exports.createCategory = (data, cb) => {
  db.query(`INSERT INTO category (categoryName) 
  VALUES ('${data.name}')
  `, cb)
}

exports.getCategoryById = (id, cb) => {
  db.query(`SELECT * FROMs category WHERE id=${id}`
    , cb)
}

exports.getCategoryByCondition = (cond, cb) => {
  db.query(`SELECT category.categoryName, category.createAt FROM category WHERE category.categoryName LIKE '%${cond}%'
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
