var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var mongoose = require('mongoose');

//Route definitions
var routes = require('./routes/index');

var app = express();

app.use(logger('dev'));
// Middleware for cookie parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// client-session middleware
app.use(session({
/*
  cookieName: 'mysession', // cookie name dictates the key name added to the request object
*/
  cookieName: 'session',
  secret: 'awqelajhkhlaksdkakfjkapqokadhghadshhasfhaqiw', // should be a large unguessable string
  duration: 5 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 1 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

mongoose.connect('mongodb://localhost/myDb');

//Middleware to enable CROS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send('error');
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send('error');
});

module.exports = app;