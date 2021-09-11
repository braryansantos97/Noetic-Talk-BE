const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: 'User'},
  chatmessage: { type: String, required: true}
}, {
  timestamps: true
})

module.exports = model('Chat', chatSchema)
