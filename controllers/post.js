const Post = require('../models/post');
const cloudinary = require('cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

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
    res.render('post/index', { title: 'Post Index', posts: posts });
  } else {
    // res.status(404).json({
    //   status: false,
    //   message: 'no posts found',
    // });

    throw new Error('No posts found. Click on + to create a new post');
  }
};

// Post New
let postNew = async (req, res, next) => {
  res.render('post/new', { title: 'New Post' });
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

  if (req.body.location) {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.location,
        limit: 1,
      })
      .send();
    req.body.coordinates = response.body.features[0].geometry.coordinates;
  }

  let post = await Post.create(req.body);
  if (post) {
    console.log(post);
    req.session.success = 'Post created successfully';
    res.redirect(`/post/${post._id}`);
  } else {
    // res.status(500).json({
    //   status: false,
    //   message: 'Internal server error',
    // });

    throw new Error('Internal Server Error');
  }
};

// Post Show
let postShow = async (req, res, next) => {
  let post = await Post.findById(req.params.id).populate({
    path: 'review',
    select: 'author body rating',
    options: { sort: { _id: -1 } },
    populate: {
      path: 'author',
      select: 'username',
    },
  });

  if (post) {
    console.log(post);
    res.render('post/show', { title: 'Show Post', post });
  } else {
    // res.status(404).json({
    //   status: false,
    //   message: 'post not found',
    // });

    throw new Error('Requested post not found');
  }
};

// Post Edit
let postEdit = async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (post) {
    console.log(post);
    res.render('post/edit', { title: 'Edit Post', post });
  } else {
    // res.status(404).json({
    //   status: false,
    //   message: 'post not found',
    // });

    throw new Error('Requested post not found');
  }
};

// Post Update
let postUpdate = async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    // res.status(404).json({
    //   status: false,
    //   message: 'post not found',
    // });

    throw new Error('Requested post not found');
  }
  let deleteImages = req.body.deleteImages;
  if (deleteImages?.length > 0) {
    for (const public_id of deleteImages) {
      // delete images from cloudinary
      await cloudinary.v2.uploader.destroy(public_id);
      // delete image from post.images
      post.images.forEach((image, index) => {
        if (image.public_id === public_id) {
          post.images.splice(index, 1);
        }
      });
    }
  }

  if (req.files) {
    for (const file of req.files) {
      let image = await cloudinary.v2.uploader.upload(file.path);
      post.images.push({
        url: image.secure_url,
        public_id: image.public_id,
      });
    }
  }

  if (post.location !== req.body.location) {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.location,
        limit: 1,
      })
      .send();
    post.coordinates = response.body.features[0].geometry.coordinates;
    post.location = req.body.location;
  }

  // update the post with any new properties
  post.title = req.body.title;
  post.description = req.body.description;
  post.price = req.body.price;

  let updatedPost = await post.save();
  if (updatedPost) {
    console.log(updatedPost);
    req.session.success = 'Post updated successfully';
    res.redirect(`/post/${post._id}`);
  } else {
    // res.status(500).json({
    //   status: false,
    //   message: 'Internal server error',
    // });

    throw new Error('Internal Server Error');
  }
};

// Post Delete
let postDelete = async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  for (const image of post.images) {
    await cloudinary.v2.uploader.destroy(image.public_id);
  }
  if (post) {
    console.log(post);
    post.remove();
    req.session.success = 'Post deleted successfully';
    res.redirect('/post');
  } else {
    // res.status(404).json({
    //   status: false,
    //   message: 'post not found',
    // });

    throw new Error('Requested post not found');
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
