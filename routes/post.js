const express = require('express');
const router = express.Router();

// GET post index /post
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Post' });
  res.send('/post');
});

// GET post new /post
router.get('/new', (req, res, next) => {});

// POST post /post
router.post('/', (req, res, next) => {});

// GET post show /post/:id
router.get('/:id', (req, res, next) => {});

// GET post edit /post
router.get('/:id/edit', (req, res, next) => {});

// PUT post update /post/:id
router.put('/:id', (req, res, next) => {});

// DELETE post destroy /post/:id
router.delete('/:id', (req, res, next) => {});

module.exports = router;
