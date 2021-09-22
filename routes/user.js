const express = require('express');
const {
  asyncErrorHandler,
  checkIfUserExists,
} = require('../middleware/errors');
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout,
} = require('../controllers/user');

const router = express.Router();

// GET user index /user
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'user' });
  res.send('/user');
});

// GET register /user/register
router.get('/register', getRegister);

// POST register /user/register
router.post(
  '/register',
  asyncErrorHandler(checkIfUserExists),
  asyncErrorHandler(postRegister),
);

// GET login /user/login
router.get('/login', getLogin);

// POST login /user/login
router.post('/login', asyncErrorHandler(postLogin));

// GET profile /user/profile
router.get('/profile', (req, res, next) => {});

// GET logout /user/logout
router.get('/logout', asyncErrorHandler(getLogout));

// GET forgot /user/forgot
router.get('/forgot', (req, res, next) => {});

// GET reset /user/reset
router.get('/reset', (req, res, next) => {});

module.exports = router;
