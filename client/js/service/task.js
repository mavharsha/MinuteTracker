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
        
        var getTasks = function(){
            
            var token = window.localStorage.getItem('token');
            console.log("token added to the http request is "+ token);
            
            var config = {headers:  {'token': token}};
            
            
           return $http.get("http://localhost:3000/dashboard", config)
                    .then(function(response){
                    console.log("the response recieved is "+ JSON.stringify(response.data));
                     return response;
                    });
            };

        return {
                postTask : postTask,
                getTasks  : getTasks 
               };
    });
}());