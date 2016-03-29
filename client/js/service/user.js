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
        
                var token = window.localStorage.getItem('token');
                var config = {headers:  {'token': token}};
            
            return $http.get("http://localhost:3000/logout", config)
                    .then(function(response){
                     return response;
                    });
                
                    };
        
            
            var register = function(username, password, firstname, lastname){
                
                var data = {
                        username: username,
                        password: password,
                        firstname: firstname,
                        lastname:   lastname
                        };                
            
                         console.log(JSON.stringify(data));
                return $http.post("http://localhost:3000/register", data)
                        .then(function(response){
                         console.log("the response recieved is "+ response.data);
                         return response;
                        });
            
                        };
        
        return {login : login, logout: logout, register: register};
    });
}());