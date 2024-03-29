require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');
// const { seedPosts } = require('./seeds');
// seedPosts();

const { preRoute } = require('./middleware/pre-route');
const { errorHandler, notFound } = require('./middleware/errors');

// require routes
const index = require('./routes/index');
const post = require('./routes/post');
const review = require('./routes/review');
const user = require('./routes/user');

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());
app.use(
  session({
    secret: 'process.env.SECRET',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// mongoose connection
mongoose.connect('mongodb://localhost:27017/surfshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");
});

// configure passport and sessions
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// set local variables middleware
app.use(preRoute);

// mount routes
app.use('/', index);
app.use('/post', post);
app.use('/review', review);
app.use('/user', user);

// middleware for handling errors
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started running on ${port}`);
});
