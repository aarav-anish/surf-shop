const Post = require('../models/post');
const mapboxToken = process.env.MAPBOX_TOKEN;

const landingPage = async (req, res, next) => {
  let posts = await Post.find({});
  res.render('index', {
    posts: posts,
    mapboxToken: mapboxToken,
    title: 'Surf Shop',
  });
};

module.exports = { landingPage };
