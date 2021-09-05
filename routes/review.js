const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/errors');
const {
  reviewCreate,
  reviewUpdate,
  reviewDelete,
} = require('../controllers/review');

// POST review /post/:id/review/:reviewId
router.post('/', asyncErrorHandler(reviewCreate));

// PUT review update /post/:id/review/:reviewId
router.put('/:id', asyncErrorHandler(reviewUpdate));

// DELETE review destroy /post/:id/review/:reviewId
router.delete('/:id', asyncErrorHandler(reviewDelete));

module.exports = router;
