const db = require('../helpers/db')

exports.createItem = (data, cb) => {
  db.query(`INSERT INTO item (productName, price) 
  VALUES ('${data.name}', ${data.price})
  `, cb)
}

exports.getItem = (cb) => {
  db.query('SELECT productName, price FROM item'
    , cb)
}

exports.getItemById = (id, cb) => {
  db.query(`SELECT * FROM item WHERE id=${id}`
    , cb)
}

exports.updateItem = (data, cb) => {
  db.query(`UPDATE item SET productName='${data.name}', price=${data.price}, 
  updatedAt='${data.updatedAt}' WHERE id=${data.id}`
  , cb)
}

exports.updateItemPartial = (data, cb) => {
  const key = Object.keys(data)
  const lastColumn = key[key.length - 1]
  db.query(`UPDATE item SET ${lastColumn}=?, updatedAt=? WHERE id=?
  `, [data[lastColumn], data.updatedAt, data.id], cb)
}

exports.deleteItem = (id, cb) => {
  db.query('DELETE FROM item WHERE id=?', [id], cb)
}

exports.getItemByCondition = (cond, cb) => {
  db.query(`SELECT item.productName, category.categoryName as category_product, item.price, variants.variantsName as variants_product, item.deliveryCondition, item.description, item.stock, item.createAt, item.updatedAt 
  FROM item LEFT JOIN category ON item.category_product = category.id
  LEFT JOIN variants ON item.variants_product = variants.id WHERE item.ProductName LIKE '%${cond}%'
  `, cb)
}

exports.sortingItem = (cond1, cond2, cb) => {
  db.query(`SELECT item.productName, category.categoryName as category_product, item.price, variants.variantsName as variants_product, item.deliveryCondition, item.stock, item.createAt, item.updatedAt 
  FROM item LEFT JOIN category ON item.category_product = category.id
  LEFT JOIN variants ON item.variants_product = variants.id ORDER BY item.${cond1} ${cond2}
  `, cb)
}
