var app = angular.module('myApp',[]);
app.controller('AppCtrl',function($scope, $http){
	$scope.showbill = false;
	$scope.show_bill = function(){
		$scope.showbill = true;
		console.log(" I am in show bill controller");
		//$scope.ridehistory = true;
		$http.get('/show_bill').success(function(response){
			console.log(response);
			$scope.bill = response;
		});
	}

	//$scope.ridehistory = false;
	
	
	$scope.ride_history = function(){
		console.log(" I am in ride history controller");
		//$scope.ridehistory = true;
		$http.get('/ride_history').success(function(response){
			console.log(response);
			$scope.history = response;
		});
	}
	
	
	$scope.show_profile = function(){
		console.log(" I am in show Profile controller");
		$http.get('/show_profile').success(function(response){
			console.log(response);
			$scope.profile = response;
		});
	}
	
	$scope.updateProfile = function(){
		console.log(" I am in update Profile controller");
		//$scope.ridehistory = true;
		$http.post('/update_profile',
				{d_fname: $scope.profile.d_fname,
				 d_lname: $scope.profile.d_lname,
				 ssn:$scope.profile.ssn,
				 d_id:$scope.profile.d_id,
				 car_number:$scope.profile.car_number,
				 insurance_number:$scope.profile.insurance_number}).success(function(response){
			console.log(response);
			$scope.profile = response;
		});
	}
	
	$scope.startride = function(){
		console.log(" I am in start ride controller");
		//$scope.ridehistory = true;
		$http.post('/start_ride',
				{r_id: $scope.startride.r_id}).success(function(response){
			console.log(response);
			$scope.startride = response;
		});
	}
	
	$scope.endride = function(){
		console.log(" I am in end ride controller");
		//$scope.ridehistory = true;
		$http.post('/end_ride',
				{r_id: $scope.endride.r_id}).success(function(response){
			console.log(response);
			$scope.endride = response;
		});
	}
	
	$scope.showreviewsnratings = function(){
		console.log(" I am in show reviews n ratings controller");
		//$scope.ridehistory = true;
		$http.get('/show_reviewsnratings').success(function(response){
			console.log(response);
			$scope.showreviewsnratings = response;
		});
	}
	
	$scope.upload_video = function(){
		console.log(" I am in upload Video controller");
		//video_link will be provided by user as input
		$scope.video_link = "abcd";
		$http.post('/upload_video',{video_link: $scope.video_link}).success(function(response){ 
			console.log(response);
			
		});
	}
	
	$scope.view_video = function(){
		console.log(" I am in upload Video controller");
		//video_link will be provided by user as input
		$http.get('/view_video').success(function(response){ 
			console.log(response);
			$scope.show_video_link = response;
		});
	}
	
	$scope.findFriends = function(){
		console.log("I will find friends");
		$http.get('/findfriends').success(function(response){
			console.log(response);
			$scope.allPeople = response;
		});
		$scope.potentialFriends = true;
		$scope.showFriends = false;
		$scope.friendRespond = false;
	};
	
	
	$scope.addFriend = function(personEmailId){
		 //var elem = document.getElementById("addButton");
		   // if (elem.value=="add Friend") elem.value = "Friend Request Sent";
		 console.log("Add Friend Id " + personEmailId);
		 $http.post('/friendrequest',{personEmailId : personEmailId}).success(function(response){
			 console.log(response);
		 });   
	};
	
	
	$scope.showFriendRequests = function(){
		$http.get('/showrequests').success(function(response){
			$scope.allRequests = response;
		});
		
		$scope.friendRespond = true;
		$scope.showFriends = false;
		$scope.potentialFriends = false;
	};
	
	
	$scope.confirm = function(requesterEmailId){
		console.log(" I will confirm a friend");
		console.log("email Id of requester is " + requesterEmailId);
		$http.post('/confirm',{requesterEmailId : requesterEmailId}).success(function(response){
			console.log(response);
		});
	};
	
	
	$scope.deleteRequest = function(requesterEmailId){
		console.log("I will delete a friend Request");
		$http.post('/deletefriendrequest',{requesterEmailId : requesterEmailId}).success(function(response){
			
		});
	};
	
});