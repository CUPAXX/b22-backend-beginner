const db = require('../helpers/db')

exports.createTransaction = (data, cb) => {
  db.query(`
  INSERT INTO transaction (code, total, tax, shipping_cost, shipping_address, payment_method, id_user) 
  VALUES (?,?,?,?,?,?,?)
  `, [data.code, data.total, data.tax, data.shipping_cost, data.shipping_address, data.payment_method, data.id_user], cb)
}

exports.createItemTransaction = (data, cb) => {
  db.query(`
  INSERT INTO item_transaction (name, price, variants, amount, id_item, id_transaction)
  VALUES (?,?,?,?,?,?)
  `, [data.name, data.price, data.variants, data.amount, data.id_item, data.id_transaction], cb)
}

exports.getTransaction = (id, cb) => {
  db.query(`
  SELECT * FROM transaction WHERE id_user=?
  `, [id], cb)
}

exports.getDetailTransaction = (id, cb) => {
  db.query(`
  SELECT transaction.code, item_transaction.name as product_name, item_transaction.price, item_transaction.amount, transaction.total, transaction.tax, transaction.shipping_cost, transaction.shipping_address, transaction.payment_method
  FROM transaction 
  INNER JOIN item_transaction ON item_transaction.id_transaction = transaction.id
  WHERE id_user=?
  `, [id], cb)
}
