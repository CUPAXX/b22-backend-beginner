const db = require('../helpers/db')
const { promisify } = require('util')
const execPromise = promisify(db.query).bind(db)

exports.getVariants = () => {
  return execPromise('SELECT id, variantsName, aditional_price FROM variants'
  )
}

exports.createVariants = (data) => {
  return execPromise(`INSERT INTO variants (variantsName, aditional_price) 
  VALUES ('${data.name}', ${data.aditional_price})
  `)
}

exports.getVariantsById = (id) => {
  return execPromise(`SELECT * FROM variants WHERE id=${id}`
  )
}

// exports.getVariantsByCondition = (cond) => {
//   return execPromise(`SELECT id.variants, variants.variantsName, variants.createAt FROM variants WHERE variants.variantsName LIKE '%${cond}%'
//   `)
// }

exports.updateVariants = (data) => {
  return execPromise(`UPDATE variants SET variantsName='${data.name}', aditional_price=${data.aditional_price}, 
  updatedAt='${data.updatedAt}' WHERE id=${data.id}`
  )
}

exports.deleteVariants = (id) => {
  return execPromise('DELETE FROM variants WHERE id=?', [id])
}

// exports.sortingVariants = (cond1, cond2, cb) => {
//   db.query(`SELECT variants.variantsName, variants.createAt
//   FROM variants ORDER BY variants.${cond1} ${cond2}
//   `, cb)
// }
