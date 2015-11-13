(function(){


    var myapp = angular.module("myapp");
    
    app.controller('DashboardController', ['$scope', function($scope) {
    
        $scope.task = "";
        $scope.category = "";
        
        $scope.taskAdded = function(){
            
           $http.post("http://localhost:3000/login", data)
                .then(function(response){
                    console.log(response.data);
                });
        };
    
    
    
    }]);





}());