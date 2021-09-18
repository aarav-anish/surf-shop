const express = require('express');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });
const { asyncErrorHandler } = require('../middleware/errors');
const {
  postIndex,
  postNew,
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDelete,
} = require('../controllers/post');

const router = express.Router();

// GET index /post
router.get('/', asyncErrorHandler(postIndex));

// GET new /post/new
router.get('/new', postNew);

// POST create /post
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

// GET show /post/:id
router.get('/:id', asyncErrorHandler(postShow));

// GET edit /post/edit/:id
router.get('/edit/:id', asyncErrorHandler(postEdit));

// PUT update /post/:id
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

// DELETE destroy /post/:id
router.delete('/:id', asyncErrorHandler(postDelete));

module.exports = router;
