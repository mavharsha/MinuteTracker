var express = require('express');
var router = express.Router();
var User = require('../Lib/User');
var Tasks = require('../Lib/Tasks');
var jwt = require('jwt-simple');
var secret = 'sasdasjkhakdhhfakkhjkdsliadsjkadsows';

// Middleware that authenticates all the secret pages
function checkAuth(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.token;
    
    if (token) {    
        try{
            var decoded = jwt.decode(token, secret);
            req.decoded = decoded;
            next();
        }
        catch(err)
        {
            console.log("Error decoding the token");
            res.status(403).json({ message: "Invalid user"});
        }
    }
    else{
        res.status(403).json({ message: "Invalid user"});
    }
};


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
                    res.status(404).send({message : "Username not found"});
                }
            else{
                    var payload = { user: user.username };
                    var token = jwt.encode(payload, secret);

                    var responseObject = {  message : "Successfully logged in.",
                                            username: user.username,
                                            token: token    };
                    res.status(200).jsonp(responseObject);
            }
        }
    });    
});


router.post('/register', function(req, res){

    var username    = req.body.username;
    var password    = req.body.password;
    var firstname   = req.body.firstname;
    var lastname    = req.body.lastname;
    
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
        else
        {
            var responseObject = {message : "Successfully registered"};
            res.status(200).json(responseObject);
        }
    });

});


router.get('/logout', checkAuth,function(req, res){

    var responseObject = { message : "Successfully logged out" };
    res.status(200).json(responseObject);
});


router.post('/dashboard', checkAuth, function(req, res) {

    var task = req.body.task;
    var category = req.body.category;
    
    var time    = new Date().getTime();
    var day     = new Date().getDay();
    var date    = new Date().getDate();
    var month   = new Date().getMonth();
    var year    = new Date().getYear();
    
    console.log("data recieved at server Task is "+ req.body.task + " and category is " + req.body.category);

        var username = req.decoded.user;
      
        var Task = new Tasks();
        Task.username       = username;
        Task.task           = task;
        Task.category       = category;
        Task.updatedTime    = time;  
        Task.updatedDay     = day;
        Task.updatedDate    = date;
        Task.updatedMonth   = month;
        Task.updatedYear    = year;

        Task.save(function(err, savedTask){

            if(err){
                console.log("Couldnot add tasks");
                res.status(500).send({message: "task not added"});
            }
            else
            {
                console.log("Couldnot add tasks" + JSON.stringify(savedTask));
                var responseObject = {message : "Successfully saved task"};
                res.status(200).json(responseObject);
            }

        });
    
});


router.get('/dashboard', checkAuth, function(req, res){
 
    Tasks.find({},{'__v':0, '_id': 0}, function(err, tasks){
            if(err){
                    console.log(err);
                }
            else{
                    if(!tasks){
                        console.log("No tasks found");
                        res.status(401).send();
                    }
                    else{
                        var responseObject = {  message : "Successfully",
                                                username: req.decoded.user,
                                                tasks   : tasks};
                        console.log(JSON.stringify(responseObject));
                        res.status(200).json(responseObject);
                    }
                }
        }); 
});

module.exports = router;