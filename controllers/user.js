const passport = require('passport');
const User = require('../models/user');

// GET /register
let getRegister = (req, res, next) => {
  res.render('user/register', { title: 'Register' });
};

let postRegister = async (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    // image: req.body.image,
  });

  User.register(newUser, req.body.password, function (err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    req.session.success = `Welcome to Surf Shop, ${newUser.username}!`;
    res.redirect('/');
  });
};

// GET /login
let getLogin = (req, res, next) => {
  res.render('user/login', { title: 'Login' });
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

module.exports = { getRegister, postRegister, getLogin, postLogin, getLogout };
