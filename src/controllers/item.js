const itemModel = require('../models/item')
const timeHelper = require('../helpers/time')

exports.getItemBySearch = (req, res) => {
  const cond = req.query.search
  if (cond) {
    itemModel.getItemByCondition(cond, (err, results, _fields) => {
      if (!err) {
        if (results.length > 0) {
          return res.status(200).json({
            success: true,
            message: 'list of product',
            results
          })
        } else {
          return res.status(400).json({
            success: false,
            message: 'item not found'
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

exports.getItem = (req, res) => {
  itemModel.getItem((err, results, _fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        message: 'list of product',
        results
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'An error occurred'
      })
    }
  })
}

exports.createItem = (req, res) => {
  itemModel.createItem(req.body, (err, results, _fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        message: 'Item Has Been Succesfully Created'
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'An error occurred'
      })
    }
  })
}

exports.updateItemPartially = (req, res) => {
  const { id: stringId } = req.params
  const id = parseInt(stringId)
  itemModel.getItemById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        const key = Object.keys(req.body)
        if (key.length > 1) {
          return res.status(400).json({
            success: false,
            message: 'system only need 1 column'
          })
        } else {
          const firstColumn = key[0]
          const updateData = { id, updatedAt: timeHelper.now(), [firstColumn]: req.body[firstColumn] }
          itemModel.updateItemPartial(updateData, (err, results, _fields) => {
            if (!err) {
              return res.status(200).json({
                success: true,
                message: 'Item Update Successfully'
              })
            } else {
              return res.status(500).json({
                success: false,
                message: 'An error ocurred'
              })
            }
          })
        }
      } else {
        return res.status(404).json({
          success: false,
          message: 'Item Not Found'
        })
      }
    }
  })
}

exports.updateItem = (req, res) => {
  const { id } = req.params
  itemModel.getItemById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        const { name, price } = req.body
        const updateData = { id, name, price, updatedAt: timeHelper.now() }
        itemModel.updateItem(updateData, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'Item Update Successfully'
            })
          } else {
            return res.status(500).json({
              success: false,
              message: 'An error occurred'
            })
          }
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'item not found'
        })
      }
    } else {
      return res.status(500).json({
        success: false,
        message: 'An error occurred'
      })
    }
  })
}

exports.deleteItem = (req, res) => {
  const { id: stringId } = req.params
  const id = parseInt(stringId)
  itemModel.getItemById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        itemModel.deleteItem(id, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'item has been deleted!'
            })
          }
        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'item not found'
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

exports.getDetailItem = (req, res) => {
  const { id: stringId } = req.params
  const id = parseInt(stringId)
  itemModel.getItemById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length === 1) {
        return res.status(200).json({
          success: true,
          message: 'detail item',
          results: results[0]
        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'item not found'
        })
      }
    } else {
      return res.status(500).json({
        success: false,
        message: 'An Error Occurred'
      })
    }
  })
}

exports.sortingItem = (req, res) => {
  const cond1 = req.query.sortingBy
  const cond2 = req.query.sortingType
  itemModel.sortingItem(cond1, cond2, (err, results, _fields) => {
    if (cond1 && cond2) {
      if (!err) {
        return res.status(200).json({
          success: true,
          message: 'List Of Product',
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
