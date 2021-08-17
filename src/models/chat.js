const db = require('../helpers/db')

exports.createChat = (data, cb) => {
  db.query('INSERT INTO chats (sender, recipient, message) VALUES (?,?,?)', [data.sender, data.recipient, data.message], cb)
}

exports.updateChat = (data, cb) => {
  db.query('UPDATE chats set isLastest=0 where sender IN (?,?) and recipient IN (?,?) and isLastest=1',
    [data.sender1, data.sender2, data.recipient1, data.recipient2], cb)
}

exports.deleteChat = (data, cb) => {
  db.query('DELETE FROM chats WHERE (sender=? or recipient=?) and id=? ', [data.sender, data.recipient, data.id], cb)
}

exports.getAllUserChat = (data, cb) => {
  db.query('SELECT chats.id, chats.sender, chats.recipient, chats.message, user.picture, user.userName, user.firstName, user.lastName, user.phoneNumber from chats LEFT JOIN user ON (chats.sender=user.phoneNumber or recipient=user.phoneNumber) WHERE sender IN (?,?) AND recipient IN (?,?)'
    , [data.sender1, data.sender2, data.recipient1, data.recipient2], cb)
}

exports.getUserChat = (data, cb) => {
  db.query('SELECT chats.id, chats.sender, chats.recipient, chats.message, user.picture, user.userName, user.firstName, user.lastName, user.phoneNumber from chats LEFT JOIN user ON (chats.sender=user.phoneNumber or recipient=user.phoneNumber) where (sender=? or recipient=?) and isLastest=1 ORDER BY chats.createdAt DESC', [data.sender, data.recipient], cb)
}
