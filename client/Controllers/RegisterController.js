(function(){
    
    app = angular.module("myapp");
    
    app.controller('RegisterController', ['$scope', 'user', '$location', function($scope, $location, user){
        
        $scope.username = "";
        $scope.password = "";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.errorRegistration = "";
        
        
        var onComplete = function(response){
                console.log(JSON.stringify(response));
                    $scope.errorRegistration = "";
                    $location.path('/login');
        };
        
        var onError = function(err){
                $scope.errorRegistration = "Couldn't register the user.";
        };

        
        $scope.registerUser = function(){
                user.register($scope.username, $scope.password, $scope.firstname, $scope.lastname)
                .then(onComplete, onError);
        };
        
        
    }]);
    
}())