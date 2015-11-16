(function(){

    var myapp = angular.module("myapp");
    myapp.factory("user", function($http){
        
        var login = function(username, password){
                    
            var data = {
                        username: username,
                        password: password
                        };
            
            console.log(data);
            
           return $http.post("http://localhost:3000/login", data)
                    .then(function(response){
                    console.log("the response recieved is "+ response.data);
                     return response;
                    });
            };
        
        
        var logout = function(){
        
        
        
        };
        
        
        return {login : login };
    });
}());