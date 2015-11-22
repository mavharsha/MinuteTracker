var app = angular.module("myapp");
    
    app.controller('LogoutController', ['$scope', function($scope) {
        
        $scope.username = window.localStorage.getItem('username');
        
        console.log($scope.username + " Logged out");
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        
    }]);