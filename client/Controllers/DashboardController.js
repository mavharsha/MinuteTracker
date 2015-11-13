(function(){


    var myapp = angular.module("myapp");
    
    app.controller('DashboardController', ['$scope', function($scope) {
    
        $scope.task = "";
        $scope.category = "";
        
        $scope.taskAdded = function(){
            
            if(!$scope.task & !$scope.category)
            {
            var data = { task : $scope.task, category : $scope.category};
            console.log("Data being sent from client " + data);
           $http.post("http://localhost:3000/dashboard", data)
                .then(function(response){
                    console.log(response.data);
                });
            }
        };
    

    }]);


}());