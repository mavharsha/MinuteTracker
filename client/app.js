(function(){

    var app = angular.module("myapp",["ngRoute"]);
    
    app.config(function($routeProvider){
    
        $routeProvider
                    .when("/login", {
                        templateUrl : "login.html",
                        controller  : "LoginController"
        
                    })
                    .when("/dashboard", {
                        templateUrl : "dashboard.html"        
                    })
                    .otherwise({redirectTo : "/login"});
    
    });
}());

