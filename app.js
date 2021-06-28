const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routes/index');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.err = req.app.get('env') === 'devlopment' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server started running on ${port}`);
});
