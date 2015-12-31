var info = angular.module('info', []);


info.controller('info', function($scope, $http) {
	window.alert("hi there inside");
	$scope.hide_trips = true;
	$scope.hide_map = false;
	$scope.rideHome = function(req, res) {
		$scope.hide_map = false;
		$scope.hide_trips = true;
	
	}
	
	$scope.trips = function(req, res) {
		$scope.hide_map = true;
		$scope.hide_trips = false;
		$http({
			method : "GET",
			url : '/showTrips',
			data : {
							
			}		
		}).success(function(response) {
			
			
	}).error(function(error) {
	/*
	$scope.unexpected_error = false;
	$scope.invalid_login = true;*/
	window.alert("errororroror");

	});
	
	}
	
	
	$scope.distance_cal = function() {
		alert("source is okok "+ $scope.source);
		alert("destination is okok "+ $scope.destination);
		$http({
			method : "POST",
			url : '/distance',
			data : {
				"source" : $scope.source,
				"destination" : $scope.destination			
			}		
		}).success(function(response) {
			
			
	}).error(function(error) {
	/*
	$scope.unexpected_error = false;
	$scope.invalid_login = true;*/
	window.alert("errororroror");

	});
		
		
		
		
		};
		
		
		
});