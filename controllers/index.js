const passport = require('passport');
const User = require('../models/user');

let postRegister = async (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    image: req.body.image,
  });

  User.register(newUser, req.body.password, function (err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    res.redirect('/');
  });
};

let postLogin = async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
  })(req, res, next);
};

let getLogout = async (req, res, next) => {
  req.logout();
  res.redirect('/');
};

module.exports = { postRegister, getLogout, postLogin };
