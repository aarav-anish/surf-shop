const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  description: String,
  price: String,
  images: [String],
  location: String,
  lattitude: String,
  longitude: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
