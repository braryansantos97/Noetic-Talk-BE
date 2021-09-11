const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: 'User'},
  message: { type: String, required: true}
}, {
  timestamps: true
})

module.exports = model('Comment', commentSchema)
