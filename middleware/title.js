const pageTitle = (req, res, next) => {
  res.locals.title = 'Surf Shop';
  next();
};

module.exports = { pageTitle };
