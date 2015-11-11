(function(){

    var app = angular.module("myapp");
    
    app.controller('LoginController', ['$scope', '$location', 'user', function($scope, $location, user) {
        $scope.username = "";
        $scope.password = "";

        
        var onComplete = function(response){

            if(response.status == 200){
                console.log("Response is "+ response.body);
                $location.path("/dashboard");
            }
            
        };
        
        var onerror = function(err){
            console.log("Unauthorized user");
        };
        
    $scope.login = function() {
         console.log("Login pressed");
       // $location.path("/dashboard");
        user.login($scope.username, $scope.password)
            .then(onComplete, onerror);
    };

    }]);
    
}());