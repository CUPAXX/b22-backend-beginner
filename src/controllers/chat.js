const { response } = require('../helpers/standardRes')
const { createChat, updateChat, deleteChat, getUserChat, getAllUserChat, uploadFile, updateDelete } = require('../models/chat')
const { getUserByPhone, getUserById, searchUser } = require('../models/user')
const { APP_URL } = process.env

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
                      req.socket.emit(data.recipient, {
                        message: data.message,
                        sender: newSender
                      })
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

exports.createUpload = (req, res) => {
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
                  req.body.picture = req.file ? `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}` : null
                  const finalData = { sender: newSender, recipient: data.recipient, picture: data.picture }
                  uploadFile(finalData, (err, results) => {
                    if (!err) {
                      req.socket.emit(data.recipient, {
                        message: data.picture,
                        sender: newSender
                      })
                      return response(res, 200, true, 'File Send Successfully', results)
                    } else {
                      return response(res, 500, false, 'An error Ocurred')
                    }
                  })
                }
              })
            } else {
              return response(res, 404, false, 'You need to login first')
            }
          } else {
            return response(res, 500, false, 'An error Ocurred')
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
  const data2 = req.body
  getUserById(req.authUser.id, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const { id: stringId } = req.params
        const id = parseInt(stringId)
        const newSender = results[0].phoneNumber
        const data = { sender: results[0].phoneNumber, recipient: results[0].phoneNumber, id }
        deleteChat(data, (err, result) => {
          if (!err) {
            const finalData = { sender1: newSender, recipient1: data2.recipient, recipient2: data2.recipient, sender2: newSender }
            updateDelete(finalData, (err, results) => {
              if (!err) {
                return response(res, 200, true, 'Delete Chat Successfully', results)
              } else {
                return response(res, 500, false, 'An error Ocurred')
              }
            })
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
      const newSender = results[0].phoneNumber
      const newUserName = results[0].userName
      const data = { sender: newSender, recipient: newSender }
      getUserChat(data, (err, results) => {
        if (!err) {
          if (results.length > 0) {
            results.forEach((pic, index) => {
              results[index].picture = `${APP_URL}${results[index].picture}`
            })

            let index = results.length - 1
            while (index >= 0) {
              if (results[index].userName === newUserName) {
                results.splice(index, 1)
              }
              index -= 1
            }

            return response(res, 200, true, 'List User Chat', results)
          } else {
            return response(res, 200, true, 'You Dont Have Any Conversation', results)
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
      const newUserName = results[0].userName
      const data = { sender1: results[0].phoneNumber, sender2: req.query.user, recipient1: req.query.user, recipient2: results[0].phoneNumber }
      getAllUserChat(data, (err, results) => {
        if (!err) {
          if (results.length > 0) {
            results.forEach((pic, index) => {
              results[index].picture = `${APP_URL}${results[index].picture}`
            })
            results.forEach((pic, index) => {
              results[index].fileUpload = `${APP_URL}${results[index].fileUpload}`
            })
            let index = results.length - 1
            while (index >= 0) {
              if (results[index].userName === newUserName) {
                results.splice(index, 1)
              }
              index -= 1
            }

            return response(res, 200, true, 'List All User Chat', results)
          } else {
            return response(res, 200, true, 'You Dont Have Any Conversation', results)
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

exports.searchUser = (req, res) => {
  const data = req.query
  data.column = data.column || 'userName'
  data.search = data.search || ''
  searchUser(data, req.authUser.id, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        results.forEach((pic, index) => {
          results[index].picture = `${APP_URL}${results[index].picture}`
        })
        return response(res, 200, true, 'List User', results)
      } else {
        return response(res, 404, false, 'User Not Found')
      }
    } else {
      return response(res, 500, false, 'An error Occured')
    }
  })
}
