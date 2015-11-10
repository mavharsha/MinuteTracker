var express = require('express');
var router = express.Router();
var User = require('../Lib/User');


router.post('/login', function(req, res){

    var username  = req.body.username;
    var password = req.body.password;
        
    User.findOne({username: username, password: password}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            if(!user){
              return  res.status(401).send();
            }            
            req.session.username = user.username;
            var responseObject = {  message : "Successfully logged in.",
                                    username: user.username };
            return res.status(200).send(responseObject);
        }
    });    
});


router.post('/register', function(req, res){

    var username  = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    
    console.log("Recieved values are " + username + " " +password+" "+ firstname +" "+ lastname ); 
    
    var newuser = new User();
    newuser.username = username;
    newuser.password = password;
    newuser.firstname = firstname;
    newuser.lastname = lastname;
    
    newuser.save(function(err, savedUser){
    
        if(err){
            console.log("Couldnot register the user");
            console.log(err);
            return   res.status(500).send();
        }
        
        var responseObject = {message : "Successfully registered"};
        return res.status(200).send(responseObject);
    });

});


router.get('/logout', function(req, res){

    req.session.destroy();
    var responseObject = {message : "Successfully logged out"};
    return res.status(200).send(responseObject);
});

/* GET home page. */
router.get('/dashboard', function(req, res) {
 
    console.log("You hit dashboard");
    if(!req.session.username){
         return res.status(401).send();
    }
    console.log(req.session.username);
    var responseObject = { message: "Logged in! Now you will have a bunch of data, and you will have to go through it and display it."};
    return  res.status(200).send(responseObject);
    
});


module.exports = router;
