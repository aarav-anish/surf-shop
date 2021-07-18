const Post = require('../models/post');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Post Get
let postIndex = async (req, res, next) => {
  let posts = await Post.find({});
  console.log(posts);
  if (posts.length > 0) {
    console.log(posts);
    res.render('post/index', { posts: posts });
  } else {
    res.status(404).json({
      status: false,
      message: 'no posts found',
    });
  }
};

// Post New
let postNew = async (req, res, next) => {
  res.render('post/new');
};

// Post Create
let postCreate = async (req, res, next) => {
  req.body.images = [];
  for (const file of req.files) {
    let image = await cloudinary.v2.uploader.upload(file.path);
    req.body.images.push({
      url: image.secure_url,
      public_id: image.public_id,
    });
  }
  let post = await Post.create(req.body);
  if (post) {
    console.log(post);
    res.redirect(`/post/${post._id}`);
  } else {
    res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};

// Post Show
let postShow = async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (post) {
    console.log(post);
    res.render('post/show', { post });
  } else {
    res.status(404).json({
      status: false,
      message: 'post not found',
    });
  }
};

// Post Edit
let postEdit = async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (post) {
    console.log(post);
    res.render('post/edit', {
      postId: post._id,
      postTitle: post.title,
      postDescription: post.description,
      postPrice: post.price,
      location: post.location,
    });
  } else {
    res.status(404).json({
      status: false,
      message: 'post not found',
    });
  }
};

// Post Update
let postUpdate = async (req, res, next) => {
  let post = await Post.findByIdAndUpdate(req.params.id, req.body);
  if (post) {
    console.log(post);
    res.redirect(`/post/${post._id}`);
  } else {
    res.status(404).json({
      status: false,
      message: 'post not found',
    });
  }
};

// Post Delete
let postDelete = async (req, res, next) => {
  let post = await Post.findByIdAndDelete(req.params.id);
  if (post) {
    console.log(post);
    res.redirect('/post');
  } else {
    res.status(404).json({
      status: false,
      message: 'post not found',
    });
  }
};

module.exports = {
  postIndex,
  postNew,
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDelete,
};
