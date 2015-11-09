(function(){

    var app = angular.module("myapp");
    
    app.controller('LoginController', ['$scope', '$location', function($scope, $location) {
        $scope.username = "";
        $scope.password = "";

    $scope.login = function() {
         console.log("Login pressed");
        $location.path("/dashboard");
        user.login($scope.username, $scope.password);
    };

    }]);
    
//    app.controller("myController",  [ '$scope', function($scope){
//        $scope.username = "";
//        $scope.password = "";
//    
//        $scope.login = function(){
//                
//            console.log("Login pressed");
//            //user.login($scope.username, $scope.password);
//            
//        };
//
//    
//    }]);

}());