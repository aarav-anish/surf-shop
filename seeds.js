const faker = require('faker');
let Post = require('./models/post');

let seedPosts = async (req, res, next) => {
  await Post.deleteMany({});
  for (const i of new Array(47)) {
    const newPost = {
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      price: faker.datatype.number(),
      location: faker.lorem.word(),
      author: '61346591dce12959b4ab9fc8',
    };
    await Post.create(newPost);
  }

  console.log('=====================================================');
  console.log('created 47 new posts');
  // console.log(faker.lorem.word());
  console.log('=====================================================');
};

module.exports = { seedPosts };
