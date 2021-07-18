const Post = require('../models/post');

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
    res.render('post/show', {
      postTitle: post.title,
      postId: post._id,
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

// Post Put
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
