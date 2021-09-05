const itemModel = require('../models/item')
const { response: standardRes, response } = require('../helpers/standardRes')
const { createProductCategory } = require('../models/productCategory')
const { createProductVariants } = require('../models/productVariants')
const { APP_URL } = process.env
const { validationResult } = require('express-validator')
const { getUserRole } = require('../models/user')

exports.createItem = async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return response(res, 400, false, result.errors[0].msg)
  }
  const user = await getUserRole(req.authUser.id)
  if (user[0].role === 'Admin') {
    req.body.picture = req.file ? `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}` : null
    itemModel.createItem(req.body, (err, results) => {
      if (!err) {
        if (typeof req.body.category !== 'object') {
          req.body.category = [req.body.category]
        }
        if (typeof req.body.variants !== 'object') {
          req.body.variants = [req.body.variants]
        }
        req.body.category.forEach(idCategory => {
          const data = {
            id_product: results.insertId,
            id_category: idCategory
          }
          createProductCategory(data, () => {
            console.log(`product ${results.insertId} added to category ${idCategory}`)
          })
        })
        req.body.variants.forEach(idVariants => {
          const data = {
            id_product: results.insertId,
            id_variants: idVariants
          }
          createProductVariants(data, () => {
            console.log(`product ${results.insertId} added to variants ${idVariants}`)
          })
        })
        if (results.affectedRows > 0) {
          return response(res, 200, true, 'Item Has Been Successfully Created', results)
        } else {
          return response(res, 500, false, `Error: ${err.sqlMessage}`)
        }
      } else {
        return standardRes(res, 500, false, 'An Error Occurred')
      }
    })
  } else {
    return response(res, 500, false, 'You are not admin can\'t do this action')
  }
}

exports.updateItemPartially = async (req, res) => {
  const user = await getUserRole(req.authUser.id)
  if (user[0].role === 'Admin') {
    const { id: stringId } = req.params
    const id = parseInt(stringId)

    itemModel.getItemById(id, (err, results, _fields) => {
      if (!err) {
        if (results.length > 0) {
          // req.body.picture = req.file ? `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}` : null
          // if (req.body.picture !== null) {
          //   console.log('1')
          // }
          const key = Object.keys(req.body)
          console.log(key.length)
          if (key.length > 1) {
            return standardRes(res, 400, false, 'System Only Need 1 Column')
          } else {
            const firstColumn = key[0]
            const updateData = { id, [firstColumn]: req.body[firstColumn] }
            itemModel.updateItemPartial(updateData, (err, results, _fields) => {
              if (!err) {
                return standardRes(res, 200, true, 'Update Success', results)
              } else {
                return standardRes(res, 500, false, 'An Error Occurred')
              }
            })
          }
        } else {
          return standardRes(res, 400, false, 'Item Not Found')
        }
      } else {
        return standardRes(res, 500, false, 'An Error Occurred')
      }
    })
  }
}

exports.updateItem = async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return response(res, 400, false, result.errors[0].msg)
  }
  const user = await getUserRole(req.authUser.id)
  if (user[0].role === 'Admin') {
    const { id } = req.params
    itemModel.getItemById(id, (err, results, _fields) => {
      if (!err) {
        if (results.length > 0) {
          req.body.picture = req.file ? `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}` : null
          const { name, price, deliveryCondition, description, stock, picture } = req.body
          const updateData = { id, name, price, deliveryCondition, description, stock, picture }
          itemModel.updateItem(updateData, (err, results, _fields) => {
            if (!err) {
              return standardRes(res, 200, true, 'Update SuccessFully', results)
            } else {
              return standardRes(res, 500, false, 'An Error Occurred')
            }
          })
        } else {
          return standardRes(res, 400, false, 'Item Not Found')
        }
      } else {
        return standardRes(res, 500, false, 'An Error Occurred')
      }
    })
  }
}

exports.deleteItem = async (req, res) => {
  const user = await getUserRole(req.authUser.id)
  if (user[0].role === 'Admin') {
    const { id: stringId } = req.params
    const id = parseInt(stringId)
    itemModel.getItemById(id, (err, results, _fields) => {
      if (!err) {
        if (results.length > 0) {
          itemModel.deleteItem(id, (err, results, _fields) => {
            if (!err) {
              return standardRes(res, 200, true, 'Item Has Been Delete', results)
            } else {
              return standardRes(res, 500, false, 'An Error Occurred')
            }
          })
        } else {
          return standardRes(res, 400, false, 'Item Not Found')
        }
      } else {
        return standardRes(res, 500, false, 'An Error Occurred')
      }
    })
  } else {
    return response(res, 500, false, 'You are not admin can\'t do this action')
  }
}

exports.getDetailItem = (req, res) => {
  const { id } = req.params
  itemModel.getItemById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        const data = {
          id: '',
          productName: '',
          picture: '',
          description: '',
          deliveryCondition: '',
          variant: [],
          createAt: '',
          updatedAt: '',
          ...results[0]
        }
        const hiddenColumn = ['aditional_price', 'end_price', 'variants', 'variants_code', 'variant_id']
        hiddenColumn.forEach(column => {
          delete data[column]
        })
        results.forEach(item => {
          data.variant.push({
            id: item.variant_id,
            name: item.variants,
            code: item.variants_code,
            price: item.end_price
          })
        })
        const pic = data
        pic.picture = `${APP_URL}${pic.picture}`
        return standardRes(res, 200, true, 'Detail Item', data)
      } else {
        return standardRes(res, 400, false, 'Item Not Found')
      }
    } else {
      return standardRes(res, 500, false, 'An Error Occurred')
    }
  })
}

// exports.getItemByCategory = (req, res) => {
//   const { id: stringId } = req.params
//   const id = parseInt(stringId)
//   itemModel.getItemByCategory(id, (err, results, _fields) => {
//     if (!err) {
//       if (results.length > 0) {
//         return standardRes(res, 200, true, 'Detail Item', results)
//       } else {
//         return standardRes(res, 400, false, 'Item Not Found')
//       }
//     } else {
//       return standardRes(res, 500, false, 'An Error Occurred')
//     }
//   })
// }

exports.getItem = async (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.sort = cond.sort || {}
  cond.sort.createAt = cond.sort.createAt || 'asc'
  cond.limit = parseInt(cond.limit) || 8
  cond.offset = parseInt(cond.limit) || 0
  cond.page = parseInt(cond.page) || 1
  cond.offset = (cond.page * cond.limit) - cond.limit
  const pageInfo = {}
  const results = await itemModel.getItemByCondition(cond)

  results.forEach((pic, index) => {
    results[index].picture = `${APP_URL}${results[index].picture}`
  })

  const resultCount = await itemModel.getItemCount(cond)
  const totalData = resultCount[0].count
  const totalPage = Math.ceil(totalData / cond.limit)
  pageInfo.totalData = totalData
  pageInfo.currentPage = cond.page
  pageInfo.totalPage = totalPage
  pageInfo.limitData = cond.limit
  pageInfo.nextPage = pageInfo.currentPage < totalPage ? `${APP_URL}/item?page=${cond.page + 1}` : null
  pageInfo.prevPage = pageInfo.currentPage > 1 ? `${APP_URL}/item?page=${cond.page - 1}` : null
  return standardRes(res, 200, true, 'List Of Product', results, pageInfo)
}

exports.getItemSec = async (req, res) => {
  const results = await itemModel.getItemByConditionSec()
  results.forEach((pic, index) => {
    results[index].picture = `${APP_URL}${results[index].picture}`
  })
  return standardRes(res, 200, true, 'List Of Product', results)
}

// exports.sortingItem = (req, res) => {
//   const cond1 = req.query.sortingBy
//   const cond2 = req.query.sortingType
//   itemModel.sortingItem(cond1, cond2, (err, results, _fields) => {
//     if (cond1 && cond2) {
//       if (!err) {
//         return standardRes(res, 'List Of Item', results)
//       } else {
//         return standardRes(res, 'Column Not Found', err, 400)
//       }
//     } else {
//       return standardRes(res, 'System Need 2 Key For Sorting', err, 500)
//     }
//   })
// }

// exports.getItemBySearch = (req, res) => {
//   const cond = req.query.search
//   if (cond) {
//     itemModel.getItemByCondition(cond, (err, results, _fields) => {
//       if (!err) {
//         if (results.length > 0) {
//           return standardRes(res, 'List Of Product', results)
//         } else {
//           return standardRes(res, 'Item Not Found', err, 400)
//         }
//       } else {
//         return standardRes(res, 'An error Occurred', err, 500)
//       }
//     })
//   } else {
//     return standardRes(res, 'An error Occurred', 500)
//   }
// }

// exports.getItem = (req, res) => {
//   itemModel.getItem((err, results, _fields) => {
//     if (!err) {
//       return standardRes(res, 'List Of Product', results)
//     } else {
//       return standardRes(res, 'An error Occurred', err, 500)
//     }
//   })
// }

// exports.createItem = (req, res) => {
// validationInteger(res, req.body.price, 'Price', () => {
//     validationInteger(res, req.body.stock, 'Stock', () => {
//       itemModel.createItem(req.body, (err, results, _fields) => {
//         if (!err) {
//           if (typeof req.body.category !== 'object' && typeof req.body.variants !== 'object') {
//             req.body.category = [req.body.category]
//             req.body.variants = [req.body.variants]
//           }
//           req.body.category.forEach(idCategory => {
//             const data = {
//               id_product: results.insertId,
//               id_category: idCategory
//             }
//             createProductCategory(data, () => {
//               console.log(`product ${results.insertId} added to category ${idCategory}`)
//             })
//           })
//           req.body.variants.forEach(idVariants => {
//             const data = {
//               id_product: results.insertId,
//               id_variants: idVariants
//             }
//             createProductVariants(data, () => {
//               console.log(`product ${results.insertId} added to variants ${idVariants}`)
//             })
//           })
//           if (results.affectedRows > 0) {
//             return standardRes(res, 'Item Has Been Successfully Created', results)
//           } else {
//             return standardRes(res, `Error: ${err.sqlMessage}`, 500)
//           }
//         } else {
//           return standardRes(res, 500, false, 'An Error Occurred')
//         }
//       })
//     })
//   })
//
// }
