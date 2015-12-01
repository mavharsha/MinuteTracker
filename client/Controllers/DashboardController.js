(function(){
    
    var myapp = angular.module("myapp");
    var chartArray = [];
    
    myapp.controller('DashboardController', ['$scope', 'task', 'user', '$location',function($scope, task, user, $location) {
    
        $scope.task = "";
        $scope.category = "";
        $scope.allTasks  = [];
        
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
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
                     index: 6}
                    ];
        
        var date = new Date();
        $scope.today =  date.getDay();
        $scope.titleDay = days[$scope.today];
       
        
        // Get task of the selected day
        $scope.getTasks = function(){

            task.getTasks($scope.today)
                    .then(function(response){
                                    console.log(JSON.stringify(response.data.tasks));
                                    $scope.allTasks = response.data.tasks;
                                    });
                            };
        
        var onCompleteAddTask = function(response){
                            console.log(JSON.stringify(response.data));
                            $scope.getTasks();
                            $scope.getChartDetails();
                            $scope.task = "";
                            $scope.category = "";
                        
                        };
        var onErrorAddTask = function(err){
                            console.log("Couldn't add task due to an error "+err);
        };
        
        // Post task
        $scope.addTask = function(){
                    
            if( $scope.task != "" &&  $scope.category != "")
                {
                    task.postTask($scope.task, $scope.category)
                        .then(onCompleteAddTask, onErrorAddTask);
                }else
                {
                    console.log("Please enter the data");
                }
        };
        
        
        $scope.getChartDetails = function(){
                task.getChartDetails($scope.today)
                    .then(function(response){
                                    console.log("Chart details are "+JSON.stringify(response.data));
                                    chartArray = response.data;
                                    removeChart();
                                    drawChart();
                                    console.log(chartArray);
                                    });
        };
        
        $scope.checkAddTaskShow = function(){
            
            var date = new Date();
            if(date.getDay() == $scope.today){
                return true;
            }
            return false;
        };
        
        
        // For change in day selected
         $scope.update = function(day){
             console.log("clicked"+ day.index);
             $scope.today = day.index;
             var week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
             $scope.titleDay = week[$scope.today];
         };
        
        // Update Ui when different day it selected
        $scope.$watch('today', function(oldvalue, newvalue){
            $scope.getTasks();
            $scope.getChartDetails();
        });
        
        // For editing the previous task
        $scope.editTask = function(task){
            
            alert("Task " +task.task +" falls under "+ task.category + " category");
            
        };
        
        // When user clicks logout
        $scope.logout = function(){
            
            user.logout()
                    .then(function(response){
                            $location.path('/logout');  
                            });
            };
        
    }]); // End of the controller
    
    var removeChart = function(){
      d3.select("svg").remove();  
    };
    
        var drawChart = function(){

        var width = 400;
        var height = 400;
        var radius = height/2;
        var color = d3.scale.category20c();

        var data = chartArray;

        var canvas = d3.select('#chart')
                    .append("svg:svg")
                    .data([data])
                    .attr("width", width)
                    .attr("height", height)
                    .append("svg:g")
                    .attr("transform", "translate(" + radius + "," + radius + ")");
        
        var pie = d3.layout.pie()
                    .value(function(d){
                        return d.count;
                    });

        // declare an arc generator function
        var arc = d3.svg.arc()
                    .outerRadius(radius);

        // select paths, use arc generator to draw
        var arcs = canvas.selectAll("g.slice")
                            .data(pie)
                            .enter()
                            .append("svg:g")
                            .attr("class", "slice");
        
        arcs.append("svg:path")
            .attr("fill", function(d, i){
                return color(i);
            })
            .attr("d", function (d) {
                return arc(d);
            });

        // add the text
        arcs.append("svg:text").attr("transform", function(d){
                    d.innerRadius = radius/2;
                    d.outerRadius = radius;
            return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
            return data[i]._id;}
                );
        }
    
     

}());