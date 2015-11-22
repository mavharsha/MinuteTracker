(function(){

    var app = angular.module("myapp");
    
    app.controller('LoginController', ['$scope', '$location', 'user', function($scope, $location, user) {
        $scope.username = "mavharsha";
        $scope.password = "dumb";

        var onComplete = function(response){
              console.log("Response is "+ JSON.stringify(response));
              console.log("Response is "+ response.data.username);
              console.log("Response is "+ response.data.message);

            if(response.status == 200){
                
                window.localStorage.setItem('token', response.data.token);
                $location.path('/dashboard');                
            }
        };
        
        var onerror = function(err){
            console.log("Unauthorized user");
        };
        
    $scope.login = function() {
        console.log("Login pressed");
        user.login($scope.username, $scope.password)
            .then(onComplete, onerror);
    };

    }]);
    
}());