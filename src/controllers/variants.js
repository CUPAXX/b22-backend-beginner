const variantsModel = require('../models/variants')
const timeHelper = require('../helpers/time')
const { response: standardRes, response } = require('../helpers/standardRes')
const { getUserRole } = require('../models/user')

// exports.getVariantsBySearch = (req, res) => {
//   const cond = req.query.search
//   if (cond) {
//     variantsModel.getVariantsByCondition(cond, (err, results, _fields) => {
//       if (!err) {
//         if (results.length > 0) {
//           return standardRes(res, 200, true, 'List of variants', results)
//         } else {
//           return standardRes(res, 400, false, 'variants Not Found')
//         }
//       } else {
//         return standardRes(res, 500, false, 'An Error Occurred')
//       }
//     })
//   } else {
//     return standardRes(res, 500, false, 'An Error Occurred')
//   }
// }

exports.getVariants = (req, res) => {
  variantsModel.getVariants((err, results, _fields) => {
    if (!err) {
      return standardRes(res, 200, true, 'List of variants', results)
    } else {
      return standardRes(res, 500, false, 'An Error Occurred')
    }
  })
}

exports.createVariants = (req, res) => {
  getUserRole(req.authUser.id, (err, results) => {
    if (err) {
      return response(res, 500, false, 'Something Wrong')
    }
    if (results[0].role === 'Admin') {
      variantsModel.createVariants(req.body, () => {
        return standardRes(res, 200, true, 'variants has been successfully created')
      })
    } else {
      return response(res, 500, false, 'You are not admin can\'t do this action')
    }
  })
}

exports.updateVariants = (req, res) => {
  getUserRole(req.authUser.id, (err, results) => {
    if (err) {
      return response(res, 500, false, 'Something Wrong')
    }
    if (results[0].role === 'Admin') {
      const { id } = req.params
      variantsModel.getVariantsById(id, (err, results, _fields) => {
        if (!err) {
          if (results.length > 0) {
            const { name, aditionalPrice } = req.body
            const updateData = { id, name, aditional_price: aditionalPrice, updatedAt: timeHelper.now() }
            variantsModel.updateVariants(updateData, (err, results, _fields) => {
              if (!err) {
                return standardRes(res, 200, true, 'variants update successfully', results)
              } else {
                return standardRes(res, 500, false, 'An Error Occurred')
              }
            })
          } else {
            return standardRes(res, 400, false, 'variants Not Found')
          }
        }
      })
    } else {
      return response(res, 500, false, 'You are not admin can\'t do this action')
    }
  })
}

exports.deleteVariants = (req, res) => {
  getUserRole(req.authUser.id, (err, results) => {
    if (err) {
      return response(res, 500, false, 'Something Wrong')
    }
    if (results[0].role === 'Admin') {
      const { id: stringId } = req.params
      const id = parseInt(stringId)
      variantsModel.getVariantsById(id, (err, results, _fields) => {
        if (!err) {
          if (results.length > 0) {
            variantsModel.deleteVariants(id, (err, results, _fields) => {
              if (!err) {
                return standardRes(res, 200, true, 'variants delete success', results)
              }
            })
          } else {
            return standardRes(res, 400, false, 'variants Not Found')
          }
        } else {
          return standardRes(res, 500, false, 'An Error Occurred')
        }
      })
    } else {
      return response(res, 500, false, 'You are not admin can\'t do this action')
    }
  })
}

// exports.sortingVariants = (req, res) => {
//   const cond1 = req.query.sortingBy
//   const cond2 = req.query.sortingType
//   variantsModel.sortingVariants(cond1, cond2, (err, results, _fields) => {
//     if (cond1 && cond2) {
//       if (!err) {
//         return res.status(200).json({
//           success: true,
//           message: 'List Of Variants',
//           results
//         })
//       } else {
//         return res.status(400).json({
//           success: false,
//           message: 'Column name not found'
//         })
//       }
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: 'System Need 2 Key For sorting'
//       })
//     }
//   })
// }

// getUserRole(req.authUser.id, (err, results) => {
//   if (err) {
//     return response(res, 500, false, 'Something Wrong')
//   }
//   if (results[0].role === 'Admin') {

//   } else {
//     return response(res, 500, false, 'You are not admin can\'t do this action')
//   }
// })
