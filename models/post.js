const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('../models/review');
const cloudinary = require('cloudinary');
const mongoosePaginate = require('mongoose-paginate-v2');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var postSchema = new Schema({
  title: String,
  description: String,
  price: String,
  images: [{ url: String, public_id: String }],
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: ['Number'],
      required: true,
    },
  },
  properties: {
    description: String,
  },
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
  avgRating: { type: Number, default: 0 },
});

postSchema.pre('remove', async function () {
  // remove images from cloudinary
  for (const image of this.images) {
    await cloudinary.v2.uploader.destroy(image.public_id);
  }

  // delete referenced reviews
  await Review.remove({ _id: { $in: this.review } });
});

postSchema.methods.calculateAvgRating = function () {
  let totalRating = 0;
  if (this.review.length) {
    this.review.forEach((item) => {
      totalRating += item.rating;
    });
    this.avgRating = Math.round((totalRating / this.review.length) * 10) / 10;
  } else {
    this.avgRating = totalRating;
  }
  let floorRating = Math.floor(this.avgRating);
  this.save();
  return floorRating;
};

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
