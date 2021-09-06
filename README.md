# Review Authorization

- Create a second user with cURL.

Sample:

```
  curl -d 'username=aarav&name=aarav&email=aarav@yahoo.com&password=password' -X POST http://localhost:3000/user/register
```

- Change existing review's author to new user's id
- Add isReviewAuthor async middleware to PUT route and test it
- Add if statement to EJS
