const  { Schema, model } = require('mongoose');
//'Comment' is being imported by mongoose we don't need to import it
// make schema = bouncer at the club

const blogSchema = new Schema({
  username: { type: String, required: true},
  topic: { type: String, required: true},
  title: { type: String, required: true},
  body: {type: String, required: true},
  comments: [ { type: Schema.Types.ObjectId, ref: 'Comment'} ]
}, {
  timestamps: true
})

module.exports = model('Blog', blogSchema)
