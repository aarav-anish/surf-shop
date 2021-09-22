# Continue User Authentication and Authorization

## Update Register and Login

- Comment out the req.user object assignment in app.js where you're setting a user to always be logged in:

```JS
// req.user = {
//   _id: '61346591dce12959b4ab9fc8',
//   // _id: '6135060622170621582a830c',
//   username: 'anish',
// };
```

- Add a getRegister method to /controllers/user.js right before existing postRegister method

```JS
// GET /user/register
let getRegister = (req, res, next) {
	res.render('register', { title: 'Register' });
},
```

- Add getLogin method to /controllers/user.js right before existing postLogin method

```JS
// GET /user/login
let getLogin = (req, res, next) {
	res.render('login', { title: 'Login' });
},
```

- Add success authentication message in postRegister method inside of /controllers/user.js

```JS
req.session.success = `Welcome to Surf Shop, ${newUser.username}!`;
```

- Add getRegister and getLogin methods to /routes/user.js

## Create Register and Login Views

- Create a new file inside of /views/user named register.ejs
- Add the following markup to it:

```HTML
<%- include('../partials/header') -%>

<div>
  <h1>We will be happy to have you here!</h1>
  <form method="POST" action="/user/register">
    <div class="form-group">
      <label> Username </label>
      <input
        class="form-control"
        type="text"
        placeholder="username"
        name="username"
        required
      />
      <label> Name </label>
      <input
        class="form-control"
        type="text"
        placeholder="full name"
        name="name"
        required
      />
      <label> Email </label>
      <input
        class="form-control"
        type="text"
        placeholder="email"
        name="email"
        required
      />
      <label> Password </label>
      <input
        class="form-control"
        type="password"
        placeholder="password"
        name="password"
        required
      />
      <label>Image</label>
      <input class="form-control" type="file" name="image" />
      <button class="btn btn-primary" type="submit" name="register">
        Register
      </button>
    </div>
  </form>
</div>

<%- include('../partials/footer') -%>
```

- Create a new file inside of /views/user named login.ejs
- Add the following markup to it:

```HTML
<%- include('../partials/header') -%>

<div>
  <h1>Great to see you again. Please login to continue</h1>
  <form method="POST" action="/user/login">
    <div class="form-group">
      <label> Username </label>
      <input
        class="form-control"
        type="text"
        placeholder="username"
        name="username"
        required
      />
      <label> Password </label>
      <input
        class="form-control"
        type="password"
        placeholder="password"
        name="password"
        required
      />
      <button class="btn btn-primary" type="submit" name="login">Login</button>
    </div>
  </form>
</div>

<%- include('../partials/footer') -%>
```

## Update navbar partial

- Replace entire /views/partials/navbar.ejs file with:

```HTML
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div class="container">
    <a class="navbar-brand">SURF SHOP</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="/post">Posts</a></li>
        <% if(currentUser) { %>
        <li class="nav-item">
          <a class="nav-link" href="/post/new">New Post</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/user/logout">Logout</a>
        </li>
        <% } else { %>
        <li class="nav-item">
          <a class="nav-link" href="/user/register">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/user/login">Login</a>
        </li>
        <% } %>
      </ul>
    </div>
  </div>
</nav>
```

## Enforce Unique Emails

- Add checkIfUserExists method inside /middleware/errors.js file

```JS
const checkIfUserExists = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    req.session.error = 'A user with the given email is already registered';
    res.redirect('back');
  }
  next();
};
```

## Add Authorization Middleware

- Still needs to be done...
