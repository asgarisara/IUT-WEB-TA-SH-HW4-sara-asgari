var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/users") ;
var userSchema = new mongoose.Schema({
    username : String ,
    firstname : String ,
    lastname : String ,
    email : String ,
    password : String
}) ;

var userModel = mongoose.model("user" , userSchema ) ;
var sara = new userModel({
    username : "sara1995" ,
    firstname : "sara" ,
    lastname : "asgari" ,
    email : "s.asgari1995@gmail.com",
    password : "Ags1995sd"
}) ;
sara.save(function (err,data) {
    if(err)
    {
        throw err;
    }
    console.log(data) ;
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post("/login" , function (req, resp, next) {
    userModel.findOne({username: req.body.username}, function (err, user) {
        console.log(user);
        if (err) {
            throw err;
        }
        else {
            if (user == null) {
                console.log("undefined user!");
                resp.json({'status': "false", 'msg': "undefined user"});
            }

            else {
                if (user.password == req.body.password) {

                    console.log("successful login");
                    resp.json({'status': "true", 'msg': "successful login"});
                }
                else {
                    resp.json({'status': "false", 'msg': "incorrect password"});
                    console.log("incorrect password");
                }
            }
        }
    })
});
//valid catch 404 and forward to error handler
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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
