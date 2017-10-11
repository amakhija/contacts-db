var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request = $http.get('/data/'+$scope.email);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

// To implement "Insert a new record", you need to:
// - Create a new controller here
app.controller('insertController', function ($scope, $http) {
    $scope.message="";
    $scope.Insert = function() {
        var request = $http.post('/insert/'+$scope.login+'/'+$scope.name+'/'+$scope.sex+'/'+$scope.RelationshipStatus+'/'+$scope.Birthyear);
        request.success(function() {
            console.log('success');
        });
        request.error(function(error){
            console.log('err');
        });
    };
});
// - Create a corresponding route handler in routes/index.js