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
            req.session.user = user;
            return res.status(200).send(user);
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
        return res.status(200).send(savedUser);
    });

});

/* GET home page. */
router.get('/dashboard', function(req, res) {
 
    console.log("You hit dashboard");
    
    if(!req.session.user){
         return res.status(401).send();
    }
    return  res.status(200).send({message: "Logged in! Now you will have a bunch of data, and you will have to go through it and display it."});
    
});


module.exports = router;
