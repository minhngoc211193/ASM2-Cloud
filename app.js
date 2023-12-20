var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var typeRouter = require('./routes/type');
var productRouter = require('./routes/product');

var app = express();

var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))

// 2. config 'mongoose' module
var mongoose = require('mongoose');
var uri = "mongodb+srv://ngocvtmgch211193:Ngoc1234@cluster.wa09nzj.mongodb.net/ToyCompany";
mongoose.set('strictQuery', true); //ignore mongoose warning
mongoose.connect(uri)
  .then(() => console.log('ok'))
  .catch((err) => console.log(err));

// 3. config 'body-parser' module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/type', typeRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//4. config port (for cloud deployment)
app.listen(process.env.PORT || 3002);

module.exports = app;
