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

const { errorHandler, notFound } = require('./middleware/errors');

// require routes
const index = require('./routes/index');
const post = require('./routes/post');
const review = require('./routes/review');
const user = require('./routes/user');

const app = express();

app.use(express.static('public'));
app.use(morgan('combined'));
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

// mount routes
app.use('/', index);
app.use('/post', post);
app.use('/review', review);
app.use('/user', user);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not found');
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.err = req.app.get('env') === 'devlopment' ? err : {};

//   let status = err.status || 500;
//   console.log(err.stack);

//   //render the error page
//   res.status(status);
//   res.render('error', {
//     message: err.message,
//     status: status,
//     stack: err.stack,
//   });
// });

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started running on ${port}`);
});

module.exports = app;
