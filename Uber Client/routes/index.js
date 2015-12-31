
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	res.render('Welcome', { title: 'Welcome' });
};
exports.signupdriver = function(req, res){
	//req.session.password="HELO";
	res.render('SignUp_Driver', { title: 'Welcome Driver' });
	
};
exports.signin = function(req, res){
	//console.log(req.session.password);
	res.render('SignIn_user', { title: 'Welcome User' });
};
exports.requestRide = function(req, res){
	res.render('Request_Ride', { title: 'Welcome User' });
};


exports.rideDetails = function(req, res){

  var https = require('https');

  var source="Colonnade South 4th Street San Jose CA United States";

  var destination="1300, The Almeda, San Jose CA United States";

  var s1 = source.split(" ").join("+");

  var d1 = destination.split(" ").join("+");

  console.log("source: "+s1);

  console.log("destination: "+d1);

  https.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+s1+'&destinations='+d1+'&mode=Driving&language=fr-FR&key=AIzaSyDMPbktYAm7BXNzz0AjxezVmZjV1zlykK4', function(res) {

  


  res.on('data', function(d) {

 

    console.log(d.toString());

    console.log("-----------");

    console.log(JSON.parse(d));

    console.log("distance: "+JSON.parse(d).rows[0].elements[0].distance.text);

    console.log("duration: "+JSON.parse(d).rows[0].elements[0].duration.text);

    

  });



  }).on('error', function(e) {

  console.error(e);

  });

};



exports.rideDriverDetails = function(req, res){

var query = "select dname from drivers";

var user_source = "Colonnade South 4th Street San Jose CA United States";

var msg_payload = { "query": query, user_source:user_source , "task":"driver_req" };


console.log("query: "+msg_payload.query+" task: "+msg_payload.task);

mq_client.make_request('driver_queue',msg_payload, function(err,results){


console.log(results);

if(err){

throw err;

}

else 

{

for(var i in results){

console.log(i.dname);

}

}  

});


};

  
