const categoryModel = require('../models/category')
const timeHelper = require('../helpers/time')
const { response: standardRes, response } = require('../helpers/standardRes')
const { getUserRole } = require('../models/user')
const { APP_URL } = process.env

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

exports.getCategory = async (req, res) => {
  const results = await categoryModel.getCategory()
  return standardRes(res, 200, true, 'List of category', results)
}

exports.createCategory = async (req, res) => {
  const user = await getUserRole(req.authUser.id)
  if (user[0].role === 'Admin') {
    await categoryModel.createCategory(req.body)
    return standardRes(res, 200, true, 'Category has been create successfully')
  } else {
    return response(res, 500, false, 'You are not admin can\'t do this action')
  }
}

exports.updateCategory = async (req, res) => {
  const user = await getUserRole(req.authUser.id)
  if (user[0].role === 'Admin') {
    const { id } = req.params
    const resultCate = await categoryModel.getCategoryById(id)
    if (resultCate.length > 0) {
      const { name } = req.body
      const updateData = { id, name, updatedAt: timeHelper.now() }
      const results = await categoryModel.updateCategory(updateData)
      return standardRes(res, 200, true, 'Category update successfully', results)
    } else {
      return standardRes(res, 400, false, 'Category Not Found')
    }
  } else {
    return response(res, 500, false, 'You are not admin can\'t do this action')
  }
}

exports.deleteCategory = async (req, res) => {
  const user = await getUserRole(req.authUser.id)
  if (user[0].role === 'Admin') {
    const { id } = req.params
    const resultsCate = await categoryModel.getCategoryById(id)
    if (resultsCate.length >= 1) {
      await categoryModel.deleteCategory(id)
      return standardRes(res, 200, true, 'Category has been Delete')
    } else {
      return standardRes(res, 400, false, 'Category Not Found')
    }
  } else {
    return response(res, 500, false, 'You are not admin can\'t do this action')
  }
}

exports.getCategoryItem = async (req, res) => {
  const { id } = req.params
  // const id = parseInt(stringId)
  const results = await categoryModel.getCategoryItem(id)

  if (results.length > 0) {
    results.forEach((pic, index) => {
      results[index].picture = `${APP_URL}${results[index].picture}`
    })
    return standardRes(res, 200, true, 'Detail category Item', results)
  } else {
    return standardRes(res, 400, false, 'category Not Found')
  }
}
