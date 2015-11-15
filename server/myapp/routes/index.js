var express = require('express');
var router = express.Router();
var User = require('../Lib/User');
var Tasks = require('../Lib/Tasks');


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


router.post('/dashboard', function(req, res) {

    var task = req.body.task;
    var category = req.body.category;
    
    var time = new Date().getTime();
    var day = new Date().getDay();
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getYear();
    // day of the week
    // date 
    // month
    // year
 
    console.log("You hit dashboard");
    console.log("Time "+ time + " Day "+ day + " Date "+date+" Month "+ month + " Year "+ month);

    console.log("data recieved at server Task is "+ req.body.task + " and category is " + req.body.category);

    if(!req.session.username){
         return res.status(401).send();
    }
    console.log(req.session.username);
    
    var username = req.session.username;
    
    var Task = new Tasks();
    Task.username    = username;
    Task.task        = task;
    Task.category    = category;
    Task.updatedTime  = time;  
    Task.updatedDay  = day;
    Task.updatedDate  = date;
    Task.updatedMonth = month;
    Task.updatedYear = year;
    
    Task.save(function(err, savedTask){
    
        if(err){
            console.log("Couldnot add tasks");
            return res.status(500).send();
        }
        
        var responseObject = {message : "Successfully saved task"};
        return res.status(200).json(responseObject);

    });
});


router.get('/dashboard', function(req, res){

    
    if(!req.session.username){
         return res.status(401).send();
    }
    
    
    Tasks.find({},{'__v':0, '_id': 0}, function(err, tasks){
        if(err){
            console.log(err);
        }
        else{
            if(!tasks){
                console.log("No tasks found");
              return  res.status(401).send();
            }            
            var responseObject = {  message : "Successfully",
                                    username: req.session.username,
                                    tasks   : tasks};
            console.log(responseObject);
            return res.status(200).json(responseObject);
        }
    });   
    

});

module.exports = router;
