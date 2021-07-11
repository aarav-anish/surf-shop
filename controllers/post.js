const Post = require('../models/post');

// Post Get
let getPost = async (req, res, next) => {
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
let newPost = async (req, res, next) => {
  res.render('post/new');
};

// Post Create
let createPost = async (req, res, next) => {
  let post = await Post.create(req.body);
  console.log(post);
  res.redirect(`/post/${post._id}`);
};

// Post Show
let showPost = async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (post) {
    console.log(post);
    res.render('post/show', {
      postTitle: post.title,
      postId: post._id,
      postContent: post.description,
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
let updatePost = async (req, res, next) => {
  let post = await Post.findOneAndUpdate(req.params.id, req.body);
  if (post) {
    console.log(post);
    res.render('post/new', { post: post });
  }
};

// Post Put
let putPost = async (req, res, next) => {
  let post = await Post.findOneAndUpdate(req.params.id, req.body);
  if (post) {
    console.log(post);
    res.redirect(`post/${post._id}`);
  }
};

// Post Delete
let deletePost = async (req, res, next) => {
  let post = await Post.findByIdAndDelete(req.params.id, req.body);
  if (post) {
    console.log(post);
    res.redirect('/post');
  }
};

module.exports = {
  getPost,
  newPost,
  createPost,
  showPost,
  updatePost,
  deletePost,
};
