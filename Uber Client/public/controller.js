var source_place;

    var destination_place;

function initMap() {

  var origin_place_id = null;

  var destination_place_id = null;

  var travel_mode = google.maps.TravelMode.DRIVING;

  var map = new google.maps.Map(document.getElementById('map'), {

    mapTypeControl: false,

    center: {lat: 37.3229926, lng: -121.88319999999999},

    zoom: 12

  });



  var directionsService = new google.maps.DirectionsService;

  var directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);



  var origin_input = document.getElementById('origin-input');

  var options = {

  componentRestrictions: {country: 'US'}

};

  

  var destination_input = document.getElementById('destination-input');

  

     

  

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);

  



  var origin_autocomplete = new google.maps.places.Autocomplete(origin_input, options);

  origin_autocomplete.bindTo('bounds', map);

  var destination_autocomplete =

      new google.maps.places.Autocomplete(destination_input, options);

  destination_autocomplete.bindTo('bounds', map);

  



  // Sets a listener on a radio button to change the filter type on Places

  // Autocomplete.

 

  

  function expandViewportToFitPlace(map, place) {

    if (place.geometry.viewport) {

      map.fitBounds(place.geometry.viewport);

    } else {

      map.setCenter(place.geometry.location);

      map.setZoom(17);

    }

  }



  origin_autocomplete.addListener('place_changed', function() {

    var place = origin_autocomplete.getPlace();

    

    source_place = place.name;

    

    

    alert("Place of origin is " + source_place

    );

    if (!place.geometry) {

      window.alert("Autocomplete's returned place contains no geometry");

      return;

    }

    expandViewportToFitPlace(map, place);



    // If the place has a geometry, store its place ID and route if we have

    // the other place ID

    origin_place_id = place.place_id;

    route(origin_place_id, destination_place_id, travel_mode,

          directionsService, directionsDisplay);

  });



  destination_autocomplete.addListener('place_changed', function() {

    var place = destination_autocomplete.getPlace();

    alert("Place of destination is " + place.name);

    destination_place = place.name;

    if (!place.geometry) {

      window.alert("Autocomplete's returned place contains no geometry");

      return;

    }

    expandViewportToFitPlace(map, place);

    

    // If the place has a geometry, store its place ID and route if we have

    // the other place ID

    destination_place_id = place.place_id;

    route(origin_place_id, destination_place_id, travel_mode,

          directionsService, directionsDisplay);

          

  });



  function route(origin_place_id, destination_place_id, travel_mode,

                 directionsService, directionsDisplay) {

    if (!origin_place_id || !destination_place_id) {

      return;

    }

    directionsService.route({

      origin: {'placeId': origin_place_id},

      destination: {'placeId': destination_place_id},

      travelMode: travel_mode

    }, function(response, status) {

      if (status === google.maps.DirectionsStatus.OK) {

        directionsDisplay.setDirections(response);

      } else {

        window.alert('Directions request failed due to ' + status);

      }

    });

  }

}

var info = angular.module('info', []);





info.controller('info', function($scope, $http) {

  //window.alert("hi there inside");

  $scope.hide_trips = true;

  $scope.hide_map = false;

  $scope.driver_det = true;

  $scope.confirmRide = true;

  $scope.hideButton = false;
  $scope.hideprofile = true;

 // alert("in controller");

  

  $scope.hideCancelRide = function() {

    // alert("in hideCancelRide");

    

    $http({

      method : "get",

      url : '/checkRideStatus',

      data : {

      }   

    }).success(function(response) {

      

      //alert(response[0].userDistance);

      window.location.assign('/userlandingpage');

      console.log(response);

  }).error(function(error) {

  window.alert("errororroror in hideCancelRide");



      });   

  };



  $scope.updateRide = function() {

    // alert("in updateRide");

    

    $http({

      method : "get",

      url : '/updateRide',

      data : {

      }   

    }).success(function(response) {

      $scope.results2 = response;

      $scope.hideButton = false;

        $scope.confirmRide=true;

      

      //alert(response[0].userDistance);

      //window.location.assign('/afterRideRequestPage');

      console.log(response);

  }).error(function(error) {

  window.alert("errororroror in hideCancelRide");



      });   

  };



  $scope.rideHome = function(req, res) {

    $scope.hide_map = false;

    $scope.hide_trips = true;

    $scope.hideprofile = true;

  }
  $scope.profile = function(req, res) {
	    $scope.hide_map = true;

	    $scope.hide_trips = true;

	    $scope.driver_det = true;
	    
	    $scope.hideprofile = false;

	  

	  }

  

  $scope.trips = function(req, res) {

    $scope.hide_map = true;

    $scope.hide_trips = false;

    $scope.driver_det = true;

  }

  

  $scope.distance_cal = function() {

    // alert("in controller");

    $scope.source = source_place;

    $scope.destination = destination_place;

    

    // alert("source is okok "+ $scope.source);

    // alert("destination is okok "+ $scope.destination);

    $http({

      method : "POST",

      url : '/distance',

      data : {

        "source" : $scope.source,

        "destination" : $scope.destination      

      }   

    }).success(function(response) {

      $scope.results1 = response;

      //window.location.assign('/afterRideRequestPage');

      console.log(response);
     
      $scope.hideButton = true;

      $scope.hide_map = false;

      $scope.driver_det = false;

      $scope.hide_trips = true;

  }).error(function(error) {

  /*

  $scope.unexpected_error = false;

  $scope.invalid_login = true;*/

  window.alert("errororroror in distance_cal");



  });

    

    };

  

  $scope.findId = function(id){

    // alert("in findId controller");

      $scope.driver_det = true;

  $http({

      method : "POST",

      url : '/confirmDriver',

      data : {

        "driverId" : id ,

        "source" : $scope.source,

        "destination" : $scope.destination 

        

      }   

    }).success(function(response) {

      $scope.hideButton = true;

      $scope.results2 = response;

      $scope.confirmRide = false;

      //alert(response[0].userDistance);

      //window.location.assign('/afterRideRequestPage');

      console.log(response);

  }).error(function(error) {

  /*

  $scope.unexpected_error = false;

  $scope.invalid_login = true;*/

  window.alert("errororroror in findId");



  });

    

  }



  

});







function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition, showError);

        var pos = {

        lat: position.coords.latitude,

        lng: position.coords.longitude

      };



      infoWindow.setPosition(pos);

      infoWindow.setContent('Location found.');



    } else {

        x.innerHTML = "Geolocation is not supported by this browser.";

    }

}



function showPosition(position) {

    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="

    +latlon+"&zoom=14&size=500x500&sensor=true";

    document.getElementById("map").innerHTML = "<img src='"+img_url+"'>";

}



function showError(error) {

    switch(error.code) {

        case error.PERMISSION_DENIED:

            x.innerHTML = "User denied the request for Geolocation."

            break;

        case error.POSITION_UNAVAILABLE:

            x.innerHTML = "Location information is unavailable."

            break;

        case error.TIMEOUT:

            x.innerHTML = "The request to get user location timed out."

            break;

        case error.UNKNOWN_ERROR:

            x.innerHTML = "An unknown error occurred."

            break;

    }

}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {

  infoWindow.setPosition(pos);

  infoWindow.setContent(browserHasGeolocation ?

                        'Error: The Geolocation service failed.' :

                        'Error: Your browser doesn\'t support geolocation.');

}