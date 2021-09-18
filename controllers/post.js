const Post = require('../models/post');
const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapboxToken });

// Post Get
let postIndex = async (req, res, next) => {
  let posts = await Post.paginate(
    {},
    {
      page: req.query.page || 1,
      limit: 10,
      sort: { _id: -1 },
    },
  );
  res.render('post/index', {
    title: 'Post Index',
    posts: posts,
    mapboxToken: mapboxToken,
  });
};

// Post New
let postNew = async (req, res, next) => {
  res.render('post/new', { title: 'New Post' });
};

// Post Create
let postCreate = async (req, res, next) => {
  req.body.images = [];
  for (const file of req.files) {
    // let image = await cloudinary.v2.uploader.upload(file.path);
    req.body.images.push({
      path: file.path,
      filename: file.filename,
    });
  }

  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.location,
      limit: 1,
    })
    .send();
  req.body.geometry = response.body.features[0].geometry;

  let post = new Post(req.body);
  post.properties.description = `<strong><a href="/post/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
  let newPost = await post.save();
  if (newPost) {
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
    let floorRating = post.calculateAvgRating();
    res.render('post/show', {
      title: 'Show Post',
      post: post,
      floorRating: floorRating,
      mapboxToken: mapboxToken,
    });
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
    for (const filename of deleteImages) {
      // delete images from cloudinary
      await cloudinary.uploader.destroy(filename);
      // delete image from post.images
      post.images.forEach((image, index) => {
        if (image.filename === filename) {
          post.images.splice(index, 1);
        }
      });
    }
  }

  if (req.files) {
    for (const file of req.files) {
      // let image = await cloudinary.v2.uploader.upload(file.path);
      post.images.push({
        path: file.path,
        filename: file.filename,
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
    post.geometry = response.body.features[0].geometry;
    post.location = req.body.location;
  }

  // update the post with any new properties
  post.title = req.body.title;
  post.description = req.body.description;
  post.price = req.body.price;
  post.properties.description = `<strong><a href="/post/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;

  let updatedPost = await post.save();
  if (updatedPost) {
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
  if (post) {
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
