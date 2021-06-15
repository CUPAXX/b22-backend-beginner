const db = require('../helpers/db')

const table = 'user'

exports.createUser = (data, cb) => {
  db.query(`
  INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)
  `, [data.name, data.email, data.password], cb)
}

exports.getUserByEmail = (email, cb) => {
  db.query(`
  SELECT id, email, password FROM ${table} WHERE email=?
  `, [email], cb)
}

exports.getUser = (cb) => {
  db.query('SELECT id, email, createAt, updatedAt FROM user', cb)
}

exports.getUserById = (id, cb) => {
  db.query(`
  SELECT id, picture, name, email, address FROM user WHERE id=?
  `, [id], cb)
}

// exports.deleteUser = (id, cb) => {
//   db.query(`
//   DELETE FROM user WHERE id=?
//   `, [id], cb)
// }

exports.updateUser = (data, cb) => {
  db.query(`
  UPDATE user SET name=?, email=?, password=?, address=? WHERE id=?
  `, [data.name, data.email, data.password, data.address, data.id], cb)
}

exports.updateUser2 = (data, cb) => {
  db.query(`
  UPDATE user SET name=?, email=?, address=? WHERE id=?
  `, [data.name, data.email, data.address, data.id], cb)
}

exports.getUserRole = (id, cb) => {
  db.query(`
  SELECT role FROM user WHERE id=?
  `, [id], cb)
}

exports.updateUserPartial = (data, cb) => {
  const key = Object.keys(data)
  const lastColumn = key[key.length - 1]
  db.query(`UPDATE user SET ${lastColumn}=? WHERE id=?
  `, [data[lastColumn], data.id], cb)
}

exports.changePasswordUser = (data, cb) => {
  db.query(`
  UPDATE user SET password=? WHERE id=?
  `, [data.password, data.id], cb)
}
