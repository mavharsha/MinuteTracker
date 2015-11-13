var express = require('express');
var router = express.Router();
var User = require('../Lib/User');
var User = require('../Lib/Tasks');


router.post('/login', function(req, res){

    var username = req.body.username;
    var password = req.body.password;
    console.log("Recieved values are " + username + " " +password); 

    User.findOne({username: username, password: password}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            if(!user){
                console.log("No user found");
              return  res.status(401).send();
            }            
            req.session.username = user.username;
            var responseObject = {  message : "Successfully logged in.",
                                    username: user.username };
            console.log(responseObject);
            return res.status(200).json(responseObject);
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
        return res.status(200).json(responseObject);
    });

});


router.get('/logout', function(req, res){

    req.session.destroy();
    var responseObject = {message : "Successfully logged out"};
    return res.status(200).json(responseObject);
});

/* GET home page. */
router.post('/dashboard', function(req, res) {

    var task = req.body.task;
    var category = req.body.category;
 
    console.log("You hit dashboard");
    console.log("data recieved at server Task is "+ req.body.task + " and category is " + req.body.category);

    if(!req.session.username){
         return res.status(401).send();
    }
    console.log(req.session.username);
    
    var username = req.session.username;
    
    var Task = new Tasks();
    Task.username = username;
    Task.task = task;
    Task.categoory = category;
    
    Task.save(function(err, savedTask){
    
        if(err){
            console.log("Couldnot add tasks");
            return res.status(500).send();
        }
        
        var responseObject = {message : "Successfully saved task"};
        return res.status(200).json(responseObject);
    
    });
    
    
    
    var responseObject = { message: "Logged in! Now you will have a bunch of data, and you will have to go through it and display it."};
    return  res.status(200).json(responseObject);
});


module.exports = router;
