const db = require('../helpers/db')

exports.createItem = (data, cb) => {
  db.query(`INSERT INTO item (productName, price, deliveryCondition, description, stock, picture) 
  VALUES (?, ?, ?, ?, ?, ?)
  `, [data.name, data.price, data.deliveryCondition, data.description, data.stock, data.picture], cb)
}

exports.getItemById = (id, cb) => {
  db.query(`
  SELECT item.id, item.productName, variants.id as variant_id, item.picture, item.price as base_price, variants.aditional_price, (item.price + variants.aditional_price) as end_price, variants.variantsName as variants, variants.code as variants_code, item.deliveryCondition, item.description, item.stock, item.createAt, item.updatedAt 
  FROM item
  INNER JOIN product_variants ON product_variants.id_product = item.id
  INNER JOIN variants ON product_variants.id_variants = variants.id WHERE item.id=?
  `, [id], cb)
}

exports.updateItem = (data, cb) => {
  db.query(`UPDATE item SET productName=?, price=?, deliveryCondition=?, description=?, stock=?, picture=${data.picture ? `'${data.picture}'` : null}
   WHERE id=?`
  , [data.name, data.price, data.deliveryCondition, data.description, data.stock, data.id], cb)
}

exports.updateItemPartial = (data, cb) => {
  const key = Object.keys(data)
  const lastColumn = key[key.length - 1]
  db.query(`UPDATE item SET ${lastColumn}=? WHERE id=?
  `, [data[lastColumn], data.id], cb)
}

exports.deleteItem = (id, cb) => {
  db.query('DELETE FROM item WHERE id=?', [id], cb)
}

// exports.getItemByCondition = (cond, cb) => {
//   const orderBy = Object.keys(cond.sort)[0]
//   const sort = cond.sort[orderBy]
//   db.query(`
//   SELECT item.id, item.productName, item.picture, item.price as base_price, variants.aditional_price, (item.price + variants.aditional_price) as end_price,
//   variants.variantsName as variants, variants.code as variants_code, item.deliveryCondition, item.description, item.stock, item.createAt, item.updatedAt
//   FROM item
//   INNER JOIN product_variants ON product_variants.id_product = item.id
//   INNER JOIN variants ON product_variants.id_variants = variants.id WHERE item.productName LIKE '%${cond.search}%'
//   ORDER BY item.${orderBy} ${sort}
//   LIMIT ? OFFSET ?
//   `, [cond.limit, cond.offset], cb)
// }

exports.getItemByCondition = (cond, cb) => {
  const orderBy = Object.keys(cond.sort)[0]
  const sort = cond.sort[orderBy]
  db.query(`
  SELECT item.id, item.productName, item.picture, item.price, item.deliveryCondition, item.description, item.stock, item.createAt, item.updatedAt 
  FROM item
  WHERE item.productName LIKE '%${cond.search}%' 
  ORDER BY item.${orderBy} ${sort} 
  LIMIT ? OFFSET ?
  `, [cond.limit, cond.offset], cb)
}

exports.getItemByConditionSec = (cb) => {
  db.query(`
  SELECT item.id, item.productName, item.picture, item.price, item.deliveryCondition, item.description, item.stock, item.createAt, item.updatedAt 
  FROM item
  `, cb)
}
exports.getItemCount = (cond, cb) => {
  db.query(`
  SELECT COUNT (item.id) as count, item.productName, item.picture, item.price, item.deliveryCondition, item.description, item.stock, item.createAt, item.updatedAt 
  FROM item 
  WHERE item.productName LIKE '%${cond.search}%'
  `, cb)
}

// exports.getItemCount = (cond, cb) => {
//   db.query(`
//   SELECT COUNT (item.id) as count, item.productName, item.picture, item.price as base_price, variants.aditional_price, (item.price + variants.aditional_price) as end_price,
//   variants.variantsName as variants, variants.code as variants_code, item.deliveryCondition, item.description, item.stock, item.createAt, item.updatedAt
//   FROM item
//   INNER JOIN product_variants ON product_variants.id_product = item.id
//   INNER JOIN variants ON product_variants.id_variants = variants.id
//   WHERE item.productName LIKE '%${cond.search}%'
//   `, cb)
// }

exports.getItem = (cond, cb) => {
  db.query(`SELECT id, productName, price, createAt, updatedAt FROM item  WHERE item.productName LIKE '%${cond.search}%' LIMIT ? OFFSET ?
  `, [cond.limit, cond.offset], cb)
}

exports.getItembyId = (id, cb) => {
  db.query(`
  SELECT id, productName, price from item WHERE id IN (?)
  `, [id], cb)
}
