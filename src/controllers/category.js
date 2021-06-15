const categoryModel = require('../models/category')
const timeHelper = require('../helpers/time')
const { response: standardRes, response } = require('../helpers/standardRes')
const { getUserRole } = require('../models/user')

// exports.getCategoryBySearch = (req, res) => {
//   const cond = req.query.search
//   if (cond) {
//     categoryModel.getCategoryByCondition(cond, (err, results, _fields) => {
//       if (!err) {
//         if (results.length > 0) {
//           return standardRes(res, 200, true, 'List of category', results)
//         } else {
//           return standardRes(res, 400, false, 'Category Not Found')
//         }
//       } else {
//         return standardRes(res, 500, false, 'An Error Occurred')
//       }
//     })
//   } else {
//     return standardRes(res, 500, false, 'An Error Occurred')
//   }
// }

exports.getCategory = (req, res) => {
  categoryModel.getCategory((err, results, _fields) => {
    if (!err) {
      return standardRes(res, 200, true, 'List of category', results)
    } else {
      return standardRes(res, 500, false, 'An Error Occurred')
    }
  })
}

exports.createCategory = (req, res) => {
  getUserRole(req.authUser.id, (err, results) => {
    if (err) {
      return response(res, 500, false, 'Something Wrong')
    }
    if (results[0].role === 'Admin') {
      categoryModel.createCategory(req.body, () => {
        return standardRes(res, 200, true, 'Category has been create successfully')
      })
    } else {
      return response(res, 500, false, 'You are not admin can\'t do this action')
    }
  })
}

exports.updateCategory = (req, res) => {
  getUserRole(req.authUser.id, (err, results) => {
    if (err) {
      return response(res, 500, false, 'Something Wrong')
    }
    if (results[0].role === 'Admin') {
      const { id } = req.params
      categoryModel.getCategoryById(id, (err, results, _fields) => {
        if (!err) {
          if (results.length > 0) {
            const { name } = req.body
            const updateData = { id, name, updatedAt: timeHelper.now() }
            categoryModel.updateCategory(updateData, (err, results, _fields) => {
              if (!err) {
                return standardRes(res, 200, true, 'Category update successfully', results)
              } else {
                return standardRes(res, 500, false, 'An Error Occurred')
              }
            })
          } else {
            return standardRes(res, 400, false, 'Category Not Found')
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

exports.deleteCategory = (req, res) => {
  getUserRole(req.authUser.id, (err, results) => {
    if (err) {
      return response(res, 500, false, 'Something Wrong')
    }
    if (results[0].role === 'Admin') {
      const { id: stringId } = req.params
      const id = parseInt(stringId)
      categoryModel.getCategoryById(id, (err, results, _fields) => {
        if (!err) {
          if (results.length > 0) {
            categoryModel.deleteCategory(id, (err, results, _fields) => {
              if (!err) {
                return standardRes(res, 200, true, 'Category has been Delete', results)
              }
            })
          } else {
            return standardRes(res, 400, false, 'Category Not Found')
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

exports.getCategoryItem = (req, res) => {
  const { id: stringId } = req.params
  const id = parseInt(stringId)
  categoryModel.getCategoryItem(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        return standardRes(res, 200, true, 'Detail category Item', results)
      } else {
        return standardRes(res, 400, false, 'category Not Found')
      }
    } else {
      return standardRes(res, 500, false, 'An Error Occurred')
    }
  })
}

// getUserRole(req.authUser.id, (err, results) => {
//   if (err) {
//     return response(res, 500, false, 'Something Wrong')
//   }
//   if (results[0].role === 'Admin') {

//   } else {
//     return response(res, 500, false, 'You are not admin can\'t do this action')
//   }
// })
