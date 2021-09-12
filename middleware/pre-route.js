const preRoute = (req, res, next) => {
  req.user = {
    _id: '61346591dce12959b4ab9fc8',
    // _id: '6135060622170621582a830c',
    username: 'anish',
  };
  res.locals.currentUser = req.user;
  // set default page title
  res.locals.title = 'Surf Shop';
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  // continue onto next function on middleware chain
  next();
};

module.exports = { preRoute };
