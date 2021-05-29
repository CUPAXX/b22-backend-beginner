const db = require('../helpers/db')

exports.getVariants = (cb) => {
  db.query('SELECT variantsName FROM variants'
    , cb)
}

exports.createVariants = (data, cb) => {
  db.query(`INSERT INTO variants (variantsName) 
  VALUES ('${data.name}')
  `, cb)
}

exports.getVariantsById = (id, cb) => {
  db.query(`SELECT * FROM variants WHERE id=${id}`
    , cb)
}

exports.updateVariants = (data, cb) => {
  db.query(`UPDATE variants SET variantsName='${data.name}', 
  updatedAt='${data.updatedAt}' WHERE id=${data.id}`
  , cb)
}

exports.deleteVariants = (id, cb) => {
  db.query('DELETE FROM variants WHERE id=?', [id], cb)
}
