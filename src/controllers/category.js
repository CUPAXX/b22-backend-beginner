const categoryModel = require('../models/category')
const timeHelper = require('../helpers/time')

exports.getCategory = (req, res) => {
  categoryModel.getCategory((err, results, _fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        message: 'list of category',
        results
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'Server Error'
      })
    }
  })
}

exports.createCategory = (req, res) => {
  categoryModel.createCategory(req.body, () => {
    return res.json({
      success: true,
      message: 'Category Has Been Succesfully Create'
    })
  })
}

exports.updateCategory = (req, res) => {
  const { id } = req.params
  categoryModel.getCategoryById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        const { name } = req.body
        const updateData = { id, name, updatedAt: timeHelper.now() }
        categoryModel.updateCategory(updateData, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'Category Update Successfully'
            })
          } else {
            return res.status(500).json({
              success: false,
              message: 'An error ocurred'
            })
          }
        })
      }
    }
  })
}

exports.deleteCategory = (req, res) => {
  const { id: stringId } = req.params
  const id = parseInt(stringId)
  categoryModel.getCategoryById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        categoryModel.deleteCategory(id, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'Category has been deleted!'
            })
          }
        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'category not found'
        })
      }
    } else {
      return res.status(500).json({
        success: false,
        message: 'An error Ocurred'
      })
    }
  })
}
