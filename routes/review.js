const express = require('express');
const router = express.Router();

// GET review index /review/:postId
router.get('/:postId', (req, res, next) => {
  // res.render('index', { title: 'review' });
  res.send('/:postId');
});

// POST review /review/:postId
router.post('/:postId', (req, res, next) => {});

// GET review show /review/:id
router.get('/:id', (req, res, next) => {});

// GET review edit /review/edit/:id
router.get('/edit/:id', (req, res, next) => {});

// PUT review update /review/:id
router.put('/:id', (req, res, next) => {});

// DELETE review destroy /review/:id
router.delete('/:id', (req, res, next) => {});

module.exports = router;
