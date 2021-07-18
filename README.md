# Image upload

- Create [cloudinary account](https://cloudinary.com/)
- Activate account from email
- Install [cloudinary](https://www.npmjs.com/package/cloudinary) and [multer](https://www.npmjs.com/package/multer)
  `npm i cloudinary multer`
- Configure multer for upload in routes file (add image filter)
  - add middleware -> upload.array('nameAttr', maxNum)
- Update new view form element with enctype='multipart/form-data'
- Add input to form -> attrs: type='file', name='images', accept='images/\*', multiple
- Require cloudinary in controllers
- Configure cloudinary (put api_secret in .env)
- Add for...of loop with cloudinary upload
- Update Post model images field to [{url: String, public_id: String}]
- Test it out!
