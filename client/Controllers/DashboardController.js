(function(){

    var myapp = angular.module("myapp");
    
    myapp.config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.withCredentials = true;
    }]);
    
    myapp.controller('DashboardController', ['$scope', 'task', function($scope, task) {
    
        $scope.task = "";
        $scope.category = "";
        $scope.allTasks  = [];
        
        $scope.days = [ 
                    {day: 'Sunday',
                    index: 0},
                    {day: 'Monday',
                     index: 1},
                    {day: 'Tuesday',
                     index: 2},
                    {day: 'Wednesday',
                     index: 3},
                    {day: 'Thursday',
                     index: 4},
                    {day: 'Friday',
                     index: 5},
                    {day: 'Saturday',
                     index: 6},
                    ];
        
        var date = new Date();
        $scope.today =  date.getDay();
        
        $scope.getTasks = function(){

            task.getTasks($scope.today)
                    .then(function(response){
                                    console.log(JSON.stringify(response.data.tasks));
                                    $scope.allTasks = response.data.tasks;
                                    });
                            };
        
        
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
        
         $scope.update = function(day){
             console.log("clicked"+ day.this);
             $scope.today = day.index;
         };
        
        
        $scope.$watch('today', function(oldvalue, newvalue){
            
           $scope.getTasks();
        });
        
        $scope.editTask = function(task){
            
            alert("Task " +task.task +" falls under "+ task.category + " category");
            
        };
        
        
        
        
    }]); // End of the controller
    
    
   


}());