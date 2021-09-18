# Remove Local Image Storage

## Delete /uploads directory from app's root directory

- Navigate to root directory of surf-shop app in your terminal and run `rm -rf ./uploads`

## Install multer-storage-cloudinary

- `npm i multer-storage-cloudinary`

## Configure Cloudinary and Storage

- Create a folder named `cloudinary` in the app's root directory
- Create an `index.js` file inside of the new /cloudinary directory
- Add the following code to the /cloudinary/index.js file and save it:

```JS
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'surf-shop',
    allowed_formats: ['jpeg', 'jpg', 'png'],
    use_filename: true,
    filename_override: (req, file) => {
      let buf = crypto.randomBytes(16);
      buf = buf.toString('hex');
      let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/gi, '');
      uniqFileName += buf;
      return uniqFileName;
    },
  },
});

module.exports = { cloudinary, storage };
```

- Be sure to change cloud_name and api_key values (they're currently located in your `/controllers/posts.js` file)

## Update /models/posts.js

- Remove:

```JS
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

- Add: `const { cloudinary } = require('../cloudinary');`
- Remove: `images: [{ url: String, public_id: String }],`
- Remove: `await cloudinary.v2.uploader.destroy(image.public_id);`
- Add: `images: [{ path: String, filename: String }],`
- Add: `await cloudinary.uploader.destroy(image.filename);`

## Update /routes/posts.js

- Remove: `const upload = multer({'dest': 'uploads/'});`
- Add: `const { cloudinary, storage } = require('../cloudinary');`
- Add: `const upload = multer({ storage });`

## /controllers/posts.js

- Remove:

```JS
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

- Add: `const { cloudinary } = require('../cloudinary');`
- Inside both the `postCreate` and `postUpdate` methods, change:

```JS
for(const file of req.files) {
	let image = await cloudinary.v2.uploader.upload(file.path);
	req.body.post.images.push({
		url: image.secure_url,
		public_id: image.public_id
	});
}
```

to:

```JS
for(const file of req.files) {
	req.body.post.images.push({
		path: file.path,
		filename: file.filename
	});
}
```

### Replace all the occurences of (url and secure_url) with path and public_id with filename
