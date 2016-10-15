var express = require('express');
var router = express.Router();
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

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login" , function (req, resp, next) {
    userModel.findOne({username: req.body.username}, function (err, user) {
        console.log(user);
        if (err) {
            throw err;
        }
        else {
            if (user == null) {
                resp.render('index', { 'message':'this user is not exist'});
            }

            else {
                if (user.password == req.body.passwd) {
                    resp.render('success login', { username : user.username , firstname : user.firstname ,
                        lastname : user.lastname ,email : user.email , password : user.password});
                }
                else {
                    resp.render('index', { 'message':'کلمه ی عبور نادرست است'});
                }
            }
        }
    })
});

module.exports= router;

