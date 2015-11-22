(function(){

    var myapp = angular.module("myapp");
    
    myapp.config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.withCredentials = true;
    }]);
    
    myapp.controller('DashboardController', ['$scope', 'task', function($scope, task) {
    
        $scope.task = "";
        $scope.category = "";
        $scope.allTasks  = [];
        
        var date = new Date();
        $scope.today =  date.getDay();
        
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
                        $scope.task = "";
                        $scope.category = "";
                        
                        });
                }else
                {
                    console.log("Please enter the data");
                }
        }
        
         $scope.hello = function(){
        alert(this);
    };
        
        
    }]); // End of the controller
    
    
   


}());