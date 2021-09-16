const { asyncErrorHandler } = require('../middleware/errors');
const { landingPage } = require('../controllers');
const express = require('express');
const router = express.Router();

// Get home page
router.get('/', asyncErrorHandler(landingPage));

module.exports = router;
