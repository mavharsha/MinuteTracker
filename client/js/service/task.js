(function(){

    var myapp = angular.module("myapp");
    myapp.factory('task', function($http){
        
        
        var postTask = function(task, category){
                    
            var data = {
                        task: task,
                        category: category
                        };
            var token = window.localStorage.getItem('token');
            console.log("token added to the http request is "+ token);
            
            var config = {headers:  {'token': token}};
            
            console.log("Data being sent form client is " + data);
           return $http.post("http://localhost:3000/dashboard", data, config)
                    .then(function(response){
                     return response;
                    });
            };
        
        var getTasks = function(day){
            
            var token = window.localStorage.getItem('token');
            var username = window.localStorage.getItem('username');
            var day = day;
            console.log("token added to the http request is " + token);
            console.log("Username added to the http request is " + username);  
            console.log("Day added to the http request is " + day);  
            
            var config = {headers:  {'token': token, username: username, day: day }};
            
           return $http.get("http://localhost:3000/dashboard", config)
                    .then(function(response){
                     return response;
                    });
            };
        
        var getChartDetails = function(day){
            
            var token = window.localStorage.getItem('token');
            var username = window.localStorage.getItem('username');
            var day = day;
            console.log("token added to the http request is " + token);
            console.log("Username added to the http request is " + username);  
            console.log("Day added to the http request is " + day);  
            
            var config = {headers:  {'token': token, username: username, day: day }};
            
            return $http.get("http://localhost:3000/dashdetails", config)
                    .then(function(response){
                     return response;
                    });
            
            
        };

        return {
                postTask : postTask,
                getTasks  : getTasks,
                getChartDetails : getChartDetails
               };
    });
}());