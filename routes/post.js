const express = require('express');
const { errorHandler } = require('../middleware/index');
const {
  getPost,
  newPost,
  createPost,
  showPost,
  updatePost,
  deletePost,
} = require('../controllers/post');

const router = express.Router();

// GET post index /post
router.get('/', errorHandler(getPost));

// GET post new /post
router.get('/new', errorHandler(newPost));

// POST post /post
router.post('/', errorHandler(createPost));

// GET post show /post/:id
router.get('/:id', errorHandler(showPost));

// PUT post update /post/:id
router.put('/:id', errorHandler(updatePost));

// DELETE post destroy /post/:id
router.delete('/:id', errorHandler(deletePost));

module.exports = router;
