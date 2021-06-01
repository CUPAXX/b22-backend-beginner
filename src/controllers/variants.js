const variantsModel = require('../models/variants')
const timeHelper = require('../helpers/time')

exports.getVariantsBySearch = (req, res) => {
  const cond = req.query.search
  if (cond) {
    variantsModel.getVariantsByCondition(cond, (err, results, _fields) => {
      if (!err) {
        if (results.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'list of variants',
            results
          })
        } else {
          return res.status(400).json({
            success: false,
            message: 'variants not found'
          })
        }
      } else {
        return res.status(500).json({
          success: false,
          message: 'An error occurred'
        })
      }
    })
  } else {
    return res.status(500).json({
      success: false,
      message: 'An error occurred'
    })
  }
}

exports.getVariants = (req, res) => {
  variantsModel.getVariants((err, results, _fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        message: 'list of Variants',
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

exports.createVariants = (req, res) => {
  variantsModel.createVariants(req.body, () => {
    return res.json({
      success: true,
      message: 'Variants Has Been Succesfully Create'
    })
  })
}

exports.updateVariants = (req, res) => {
  const { id } = req.params
  variantsModel.getVariantsById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        const { name } = req.body
        const updateData = { id, name, updatedAt: timeHelper.now() }
        variantsModel.updateVariants(updateData, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'variants Update Successfully'
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

exports.deleteVariants = (req, res) => {
  const { id: stringId } = req.params
  const id = parseInt(stringId)
  variantsModel.getVariantsById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        variantsModel.deleteVariants(id, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'Variants has been deleted!'
            })
          }
        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'Variants not found'
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

exports.sortingVariants = (req, res) => {
  const cond1 = req.query.sortingBy
  const cond2 = req.query.sortingType
  variantsModel.sortingVariants(cond1, cond2, (err, results, _fields) => {
    if (cond1 && cond2) {
      if (!err) {
        return res.status(200).json({
          success: true,
          message: 'List Of Variants',
          results
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'Column name not found'
        })
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'System Need 2 Key For sorting'
      })
    }
  })
}
