(function(){

    var myapp = angular.module("myapp");
    
    myapp.controller('DashboardController', ['$scope', 'task', function($scope, task) {
    
        $scope.task = "";
        $scope.category = "";
        $scope.allTasks  = [];
        
        $scope.getTasks = function(){
            
                task.getTasks()
                    .then(function(response){
                                    console.log(JSON.stringify(response.data.tasks));
                                    $scope.allTasks = response.data.tasks;
                                    });
                            };
        
        $scope.getTasks();
        
        $scope.addTask = function(){
                    
            if( $scope.task != "" &&  $scope.category != "")
                {
                    task.postTask($scope.task, $scope.category)
                        .then(function(response){
                            console.log(JSON.stringify(response.data));
                            $scope.getTasks();
                        });
                }else
                {
                    console.log("Please enter the data");
                }
        }
    }]); // End of the controller


}());