const db = require('../helpers/db')

exports.getVariants = (cb) => {
  db.query('SELECT id, variantsName, aditional_price FROM variants'
    , cb)
}

exports.createVariants = (data, cb) => {
  db.query(`INSERT INTO variants (variantsName, aditional_price) 
  VALUES ('${data.name}', ${data.aditional_price})
  `, cb)
}

exports.getVariantsById = (id, cb) => {
  db.query(`SELECT * FROM variants WHERE id=${id}`
    , cb)
}

exports.getVariantsByCondition = (cond, cb) => {
  db.query(`SELECT id.variants, variants.variantsName, variants.createAt FROM variants WHERE variants.variantsName LIKE '%${cond}%'
  `, cb)
}

exports.updateVariants = (data, cb) => {
  db.query(`UPDATE variants SET variantsName='${data.name}', aditional_price=${data.aditional_price}, 
  updatedAt='${data.updatedAt}' WHERE id=${data.id}`
  , cb)
}

exports.deleteVariants = (id, cb) => {
  db.query('DELETE FROM variants WHERE id=?', [id], cb)
}

// exports.sortingVariants = (cond1, cond2, cb) => {
//   db.query(`SELECT variants.variantsName, variants.createAt
//   FROM variants ORDER BY variants.${cond1} ${cond2}
//   `, cb)
// }
