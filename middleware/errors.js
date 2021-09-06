const Review = require('../models/review');

const errorHandler = (error, req, res, next) => {
  // const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(error);

  // res.status(statusCode);
  // res.render('error', {
  //   title: 'Error !',
  //   message: error.message,
  //   status: statusCode,
  //   stack: error.stack,
  // });

  req.session.error = error.message;
  res.redirect('back');
};

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  console.log(error);

  // res.status(404);
  // res.render('error', {
  //   title: 'Error !',
  //   message: error.message,
  //   status: 404,
  //   stack: error.stack,
  // });

  req.session.error = error.message;
  res.redirect('back');
};

const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const isReviewAuthor = async (req, res, next) => {
  let review = await Review.findOne({
    _id: req.params.id,
    author: req.user._id,
  });
  if (review) {
    return next();
  }
  req.session.error = 'Unauthorized access';
  return res.redirect('/');
};

module.exports = {
  notFound,
  errorHandler,
  asyncErrorHandler,
  isReviewAuthor,
};
