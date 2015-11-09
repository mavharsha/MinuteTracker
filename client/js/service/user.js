(function(){

    var myapp = angular.module("app");
    myapp.factory("user", function($http, $log){
        
        var login = function(username, password){
                    
        
            var data = {
                        username: username,
                        password: password
                        };
            
            return $http.post("http://localhost:3000/login", data)
                    .then(function(response){
                     return response.body;
                    });
            
            };
        
        return {login : login };
    };



}());