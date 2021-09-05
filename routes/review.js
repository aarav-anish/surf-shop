const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/errors');
const {
  reviewCreate,
  reviewUpdate,
  reviewDelete,
} = require('../controllers/review');

// POST review /review
router.post('/', asyncErrorHandler(reviewCreate));

// PUT review update /review/:id
router.put('/:id', asyncErrorHandler(reviewUpdate));

// DELETE review destroy /review/:id
router.delete('/:id', asyncErrorHandler(reviewDelete));

module.exports = router;
