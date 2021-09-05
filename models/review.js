const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
  body: String,
  rating: Number,
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
