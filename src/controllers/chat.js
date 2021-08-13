const { response } = require('../helpers/standardRes')
const { createChat, updateChat, deleteChat, getUserChat, getAllUserChat } = require('../models/chat')
const { getUserByPhone, getUserById } = require('../models/user')

exports.createChat = (req, res) => {
  const data = req.body
  const subData = { phone: data.recipient }
  getUserByPhone(subData, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        getUserById(req.authUser.id, (err, results) => {
          if (!err) {
            if (results.length > 0) {
              const newSender = results[0].phoneNumber
              const updateData = { sender1: newSender, sender2: data.recipient, recipient1: data.recipient, recipient2: results[0].phoneNumber }
              updateChat(updateData, (err, results) => {
                if (!err) {
                  const finalData = { sender: newSender, recipient: data.recipient, message: data.message }
                  createChat(finalData, (err, results) => {
                    if (!err) {
                      return response(res, 200, true, 'Message Send Successfully', results)
                    } else {
                      return response(res, 500, false, 'An error Ocurred')
                    }
                  })
                } else {
                  return response(res, 500, false, 'An error Ocurred')
                }
              })
            } else {
              return response(res, 404, false, 'You not logged')
            }
          } else {
            return response(res, 404, false, 'You need to login first')
          }
        })
      } else {
        return response(res, 404, false, 'User Destination Not Found')
      }
    } else {
      return response(res, 500, false, 'An error Ocurred')
    }
  })
}
// bug fix

exports.deleteChat = (req, res) => {
  getUserById(req.authUser.id, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const { id: stringId } = req.params
        const id = parseInt(stringId)
        const data = { sender: results[0].phoneNumber, recipient: results[0].phoneNumber, id }
        deleteChat(data, (err, results) => {
          if (!err) {
            if (results.affectedRows > 0) {
              return response(res, 200, true, 'Delete Chat Successfully', results)
            } else {
              return response(res, 404, false, 'Chat Not Found')
            }
          } else {
            return response(res, 404, false, 'Chat Not Found')
          }
        })
      } else {
        return response(res, 404, false, 'You not logged')
      }
    } else {
      return response(res, 500, false, 'An error Ocurred')
    }
  })
}

exports.getUserChat = (req, res) => {
  getUserById(req.authUser.id, (err, results) => {
    if (!err) {
      const data = { sender: results[0].phoneNumber, recipient: results[0].phoneNumber }
      getUserChat(data, (err, results) => {
        if (!err) {
          if (results.length > 0) {
            return response(res, 200, true, 'List User Chat', results)
          } else {
            return response(res, 404, false, 'You Dont Have Any Conversation')
          }
        } else {
          return response(res, 500, false, 'An error occured')
        }
      })
    } else {
      return response(res, 500, false, 'An error occured')
    }
  })
}

exports.getAllUserChat = (req, res) => {
  getUserById(req.authUser.id, (err, results) => {
    if (!err) {
      const data = { sender1: results[0].phoneNumber, sender2: req.query.user, recipient1: req.query.user, recipient2: results[0].phoneNumber }
      getAllUserChat(data, (err, results) => {
        if (!err) {
          if (results.length > 0) {
            return response(res, 200, true, 'List All User Chat', results)
          } else {
            return response(res, 404, false, 'You Dont Have Any Conversation')
          }
        } else {
          return response(res, 500, false, 'An error occured')
        }
      })
    } else {
      return response(res, 500, false, 'An error occured')
    }
  })
}
