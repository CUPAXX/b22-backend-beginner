const db = require('../helpers/db')
const { promisify } = require('util')
const execPromise = promisify(db.query).bind(db)

const table = 'user'

exports.createUser = (data) => {
  return execPromise(`
  INSERT INTO ${table} (phoneNumber, email, password) VALUES (?, ?, ?)
  `, [data.phoneNumber, data.email, data.password])
}

exports.getUserByEmail = (email) => {
  // db.query(`
  // SELECT id, userName, firstName, lastName, email, password FROM ${table} WHERE email=?
  // `, [email], cb)
  return execPromise(
    `
    SELECT id, userName, firstName, lastName, email, password FROM ${table} WHERE email=?
  `,
    [email]
  )
}

exports.getUser = (cb) => {
  db.query('SELECT id, picture, userName, firstName, lastName, email, createAt, updatedAt FROM user', cb)
}

exports.getUserById = (id) => {
  return execPromise(`
  SELECT id, picture, userName, firstName, lastName, email, address, phoneNumber FROM user WHERE id=?
  `, [id])
}

// exports.deleteUser = (id, cb) => {
//   db.query(`
//   DELETE FROM user WHERE id=?
//   `, [id], cb)
// }

exports.updateUser = (data, cb) => {
  db.query(`
  UPDATE user SET userName=?, firstName=?, lastName=?, email=?,  phoneNumber=?, address=? WHERE id=?
  `, [data.userName, data.firstName, data.lastName, data.email, data.phoneNumber, data.address, data.id], cb)
}

exports.updateUser2 = (data, cb) => {
  db.query(`
  UPDATE user SET userName=?, firstName=?, lastName=?, email=?, phoneNumber=?, address=?, picture=? WHERE id=?
  `, [data.userName, data.firstName, data.lastName, data.email, data.phoneNumber, data.address, data.picture, data.id], cb)
}

exports.getUserRole = (id) => {
  return execPromise(`
  SELECT role FROM user WHERE id=?
  `, [id])
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

exports.getUserByPhone = (data, cb) => {
  db.query('SELECT * from user WHERE phoneNumber=?', [data.phone], cb)
}

exports.searchUser = (data, id, cb) => {
  db.query(`SELECT id, userName, firstName, lastName, phoneNumber, picture, email, address FROM user WHERE ${data.column} LIKE '%${data.search}%' AND id!=? `, [id], cb)
}
