(function(){

    var myapp = angular.module("myapp");
    myapp.factory('task', function($http){
        
        var postTask = function(task, category){
                    
            var data = {
                        task: task,
                        category: category
                        };
            
            console.log("Data being sent form client is " + data);
           return $http.post("http://localhost:3000/dashboard", data)
                    .then(function(response){
                     return response;
                    });
            };
        
        var getTasks = function(){
            
           return $http.get("http://localhost:3000/dashboard")
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