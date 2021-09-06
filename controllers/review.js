const Post = require('../models/post');
const Review = require('../models/review');

// Review Create
let reviewCreate = async (req, res, next) => {
  let post = await Post.findById(req.body.postId).populate('review', 'author');
  if (post) {
    let hasReviewed = post.review.filter((review) => {
      return review.author.equals(req.user._id);
    }).length;
    if (hasReviewed) {
      req.session.error = 'Sorry, you can only create one review per post';
      return res.redirect(`/post/${req.body.postId}`);
    }
    req.body.author = req.user._id;
    let review = await Review.create(req.body);
    post.review.push(review._id);
    await post.save();
    req.session.success = 'Review added successfully';
    res.redirect(`/post/${req.body.postId}`);
  } else {
    // res.status(500).json({
    //   status: false,
    //   message: 'Internal server error',
    // });

    throw new Error('Internal Server Error');
  }
};

// Review Update
let reviewUpdate = async (req, res, next) => {
  let review = await Review.findByIdAndUpdate(req.params.id, req.body);
  if (review) {
    req.session.success = 'Review updated successfully';
    res.redirect(`/post/${req.body.postId}`);
  } else {
    // res.status(404).json({
    //   status: false,
    //   message: 'review not found',
    // });

    throw new Error('Requested review not found');
  }
};

// review Delete
let reviewDelete = async (req, res, next) => {
  let review = await Review.findOneAndDelete({
    _id: req.params.id,
    postId: req.body.postId,
  });
  if (review) {
    await Post.findByIdAndUpdate(req.body.postId, {
      $pull: { review: review._id },
    });
    req.session.success = 'Review deleted successfully';
    res.redirect(`/post/${req.body.postId}`);
  } else {
    // res.status(404).json({
    //   status: false,
    //   message: 'review not found',
    // });

    throw new Error('Requested review not found');
  }
};

module.exports = {
  reviewCreate,
  reviewUpdate,
  reviewDelete,
};
