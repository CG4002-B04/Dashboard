const express = require('express')
const bodyParser = require('body-parser')
//const path = require('path')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index')
//const http = require('http')

// Set up mongoose connection
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/CG4002_Dashboard'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
})

//app.set('port', port);

module.exports = app;

