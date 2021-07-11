const express = require('express');
const { errorHandler } = require('../middleware/index');
const { postRegister, postLogin, getLogout } = require('../controllers/user');

const router = express.Router();

// GET user index /user
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'user' });
  res.send('/user');
});

// GET register /user/register
router.get('/register', (req, res, next) => {});

// POST register /user/register
router.post('/register', errorHandler(postRegister));

// POST login /user/login
router.post('/login', errorHandler(postLogin));

// GET login /user/login
router.get('/login', (req, res, next) => {
  res.send('GET login');
});

// GET profile /user/profile
router.get('/profile', (req, res, next) => {});

// GET logout /user/logout
router.get('/logout', errorHandler(getLogout));

// GET forgot /user/forgot
router.get('/forgot', (req, res, next) => {});

// GET reset /user/reset
router.get('/reset', (req, res, next) => {});

module.exports = router;
