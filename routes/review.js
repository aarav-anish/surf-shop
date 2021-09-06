const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isReviewAuthor } = require('../middleware/errors');
const {
  reviewCreate,
  reviewUpdate,
  reviewDelete,
} = require('../controllers/review');

// POST review /review
router.post('/', asyncErrorHandler(reviewCreate));

// PUT review update /review/:id
router.put('/:id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

// DELETE review destroy /review/:id
router.delete('/:id', isReviewAuthor, asyncErrorHandler(reviewDelete));

module.exports = router;
