const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  username: { type: String, required: true},
  chatmessage: { type: String, required: true},
  chatroom: { type: String, required: true}
}, {
  timestamps: true
})

module.exports = model('Chat', chatSchema)
