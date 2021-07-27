const { response } = require('../helpers/standardRes')
const { codeTransaction } = require('../helpers/transaction')
const { getItembyId } = require('../models/item')
const { createTransaction, createItemTransaction, getTransaction, getDetailTransaction } = require('../models/transaction')
const { getUserById } = require('../models/user')
const { APP_TRANSACTION_PREFIX } = process.env

exports.createTransaction = (req, res) => {
  const code = codeTransaction(APP_TRANSACTION_PREFIX, 1)
  const data = req.body
  if (typeof data.item_id === 'string') {
    data.item_id = [data.item_id]
    data.item_amount = [data.item_amount]
    // data.variants_id = [data.variants_id]
  }
  getItembyId(data.item_id.map(id => parseInt(id)), (err, items) => {
    if (!err) {
      const total = items.map((item, idx) => item.price * data.item_amount[idx]).reduce((acc, curr) => acc + curr)
      const tax = total * (10 / 100)
      const shippingCost = 10000
      const paymentMethod = data.payment_method
      const idUser = req.authUser.id
      getUserById(idUser, (err, results) => {
        if (!err) {
          const shippingAddress = results[0].address
          if (!shippingAddress) {
            return response(res, 400, false, 'please add your address first')
          }
          const finalData = {
            total, tax, shipping_cost: shippingCost, payment_method: paymentMethod, shipping_address: shippingAddress, code, id_user: idUser
          }
          createTransaction(finalData, (err, results) => {
            if (!err) {
              items.forEach((item, idx) => {
                const finalData = {
                  name: item.productName,
                  price: item.price,
                  amount: data.item_amount[idx],
                  // variants: data.variants_id[idx],
                  id_item: item.id,
                  id_transaction: results.insertId
                }
                createItemTransaction(finalData, (err) => {
                  if (!err) {
                    console.log(`item ${item.id} inserted into item_transaction`)
                  } else {
                    return response(res, 500, false, 'An error Occurred')
                  }
                })
              })
              return response(res, 200, true, 'Transaction SuccessFully', results)
            } else {
              return response(res, 500, false, 'An error Occurred')
            }
          })
        } else {
          return response(res, 500, false, 'An error Occurred')
        }
      })
    } else {
      return response(res, 500, false, 'An error Occurred')
    }
  })
}

exports.getTransaction = (req, res) => {
  getTransaction(req.authUser.id, (err, results) => {
    if (!err) {
      return response(res, 200, true, 'History Transaction', results)
    } else {
      return response(res, 500, false, 'An error Occurred')
    }
  })
}

exports.getDetailTransaction = (req, res) => {
  const { id } = req.params
  const { id: user } = req.authUser
  getTransaction(user, (err, results) => {
    if (err) throw err
    getDetailTransaction(id, (err, results) => {
      if (!err) {
        if (results.length > 0) {
          const data = {
            code: '',
            product: [],
            total: '',
            tax: '',
            shipping_cost: '',
            shipping_address: '',
            payment_method: '',
            ...results[0]
          }
          const hiddenColumn = ['product_name', 'price', 'amount']
          hiddenColumn.forEach(column => {
            delete data[column]
          })
          results.forEach(transaction => {
            data.product.push({
              product_name: transaction.product_name,
              price: transaction.price,
              amount: transaction.amount
            })
          })

          return response(res, 200, true, 'Detail Transaction', data)
        } else {
          return response(res, 400, false, 'transaction Not Found')
        }
      } else {
        return response(res, 500, false, 'An Error Occurred')
      }
    })
  })
}
