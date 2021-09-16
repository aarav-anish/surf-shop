const faker = require('faker');
let Post = require('./models/post');
let cities = require('./cities');

let seedPosts = async (req, res, next) => {
  await Post.deleteMany({});
  for (const i of new Array(800)) {
    const random1000 = Math.floor(Math.random() * 1000);
    const title = faker.lorem.words();
    const description = faker.lorem.paragraph();
    const price = faker.datatype.number();
    const postData = {
      title,
      description,
      price,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      author: '61346591dce12959b4ab9fc8',
    };
    let post = new Post(postData);
    post.properties.description = `<strong><a href="/post/${post._id}">${title}</a></strong><p>${post.location}</p><p>${description.substring(0, 20)}...</p>`;
    await post.save();
  }
  console.log('600 new posts created');
};

module.exports = { seedPosts };
