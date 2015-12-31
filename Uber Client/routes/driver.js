/**
 * New node file
 */
var mq_client = require('../rpc/client');
exports.driverlogin = function(req, res){
  res.render('driverlogin', { title: 'Driver' });
};


function ride_history(req,res){
	if(true){				// write session code here
		var d_id = req.session.did;  // get driver id from session code;
		console.log("I will show ride history");
		var task = "rideHistory";
		var msg_payload = {"task": task, "d_id": d_id };
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("ride history aa gayi");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
	
}

function driverSignUp(req,res){
	var first_name = req.param("first_name");
	var last_name = req.param("last_name");
	var email = req.param("email");
	var phone = req.param("phone");
	var password = req.param("password");
	var city_name = req.param("city_name");
	console.log(first_name);
	console.log(city_name + phone + password);
	console.log("I will Sign Up Driver");
		var task = "SignUpDriver";
		var msg_payload = {"task":task, "first_name":first_name, "last_name":last_name, "email":email, "phone":phone, "password":password, "city_name":city_name};
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("Driver SignUp Done");
					console.log(results);
					
					//////////////////////////////////// Inserting d_id to mongo as well
					var d_id = results.insertId;
					console.log("Created driver Id is " +d_id);
					var newTask = "signUpInsetIdMongo";
					var msg_payload = {"task": newTask, "d_id": d_id, "first_name":first_name };
					
					mq_client.make_request('driver_queue',msg_payload, function(errone,resultsone){
						if(errone){
							throw errone;
						}
						else 
						{
							if(resultsone){		
								console.log("d_id inserted to Mongo");
								console.log(resultsone);
								res.render('Welcome', { title: 'Welcome' });
							}
						}  
					});
					////////////////////// Inserting d_id to mongo done
					
				}
				else{
					res.send("error in signup");
				}
				res.send(results);
				}
		
		});
}

function show_reviewsnratings(req,res){
	if(true){				// write session code here
		var d_id = req.session.did;  // get driver id from session code;
		console.log("I will show ride history");
		var task = "showreviewsnratings";
		var msg_payload = {"task": task, "d_id": d_id };
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("show reviews n rarings");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
	
}
/*
function end_ride(req,res){
	if(true){				// write session code here
		var r_id = req.session.did;  // get driver id from session code;
		console.log("I will show ride history");
		var task = "endride";
		var msg_payload = {"task": task, "r_id": r_id };
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("end ride");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
	
}
*/
function show_profile(req,res){
	if(true){				// write session code here
		var d_id = req.session.did;  // get driver id from session code;
		console.log("I will show profile of driver client Side");
		var task = "showprofile";
		var msg_payload = {"task": task, "d_id": d_id };
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("driver profile aa gayi");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
	
}

function update_profile(req,res){
	if(true){				// write session code here
		var d_id = req.session.did;  // get driver id from session code;
		var d_fname = req.body.d_fname;
		var d_lname = req.body.d_lname;
		var ssn = req.body.ssn;
		var	d_id = req.body.d_id;
		var car_number = req.body.car_number;
		var insurance_number = req.body.insurance_number;

		console.log("I will update profile of driver");
		var task = "updateprofile";
		var msg_payload = {"task": task,
				"d_id": d_id,
				"d_fname": d_fname,
				"d_lname": d_lname,
				"ssn": ssn,
				"d_id": d_id,
				"car_number": car_number,
				"insurance_number": insurance_number
				};
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("driver profile aa gayi");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
}


function upload_video(req,res){
	if(true){				// write session code here
		var d_id = req.session.did;  // get driver id from session code;
		//var video_link = req.body.video_link;
		var video_link ="anusha";
		console.log("I will upload video link of driver");
		var task = "uploadVideo";
		var msg_payload = {"task": task, "d_id": d_id, "video_link":video_link };
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("driver video upload ho gaya");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
	
}

function view_video(req,res){
	if(true){				// write session code here
		var d_id = req.session.did;  // get driver id from session code;
		console.log("I will fetch video link of driver");
		var task = "fetchVideo";
		var msg_payload = {"task": task, "d_id": d_id};
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("driver video received");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
	
}

function upload_picture(req,res){
	if(true){				// write session code here
		var d_id = req.session.did;  // get driver id from session code;
		//var pic1 = req.body.pic1;
		var pic1 ="pic1";
		console.log("I will upload pictures of driver");
		var task = "uploadPictures";
		var msg_payload = {"task": task, "d_id": d_id, "pic1":pic1 };
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("driver video upload ho gaya");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
	
}

function show_bill(req,res){
	if(true){				// write session code here
		var d_id = req.session.did;  // get driver id from session code;
		//var b_id = req.body.b_id;    uncomment it when you have b_id
		console.log("I will a particualr bill detail ");
		var task = "fetchBill";
		var msg_payload = {"task": task, "d_id": d_id, "b_id":b_id };
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("Fetched bill");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
}
function give_rating(req,res){
	if(true){				// write session code here
		var r_id = 2142;
		var rating = 7; //var rating = req.body.rating;
		console.log("I will give rating to user");
		var task = "giveRating";
		var msg_payload = {"task": task, "r_id": r_id, "rating": rating };
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("rating given to driver");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
}
function fetch_rating(req,res){
	if(true){				// write session code here
		var d_id = 100;// var rating = req.body.d_id;
		console.log("I will fetch rating of a driver");
		var task = "fetchRating";
		var msg_payload = {"task": task, "d_id": d_id};
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results){		
					console.log("fetch rating of driver");
					console.log(results);
					res.send(results);
				}
			}  
		});
	}
	else{
		res.redirect('/');
	}
}
exports.fetch_rating=fetch_rating;
exports.give_rating=give_rating;
exports.show_bill = show_bill;
exports.upload_picture = upload_picture;
exports.view_video = view_video;
exports.upload_video = upload_video;
exports.show_reviewsnratings=show_reviewsnratings;
exports.driverSignUp = driverSignUp;
//exports.end_ride = end_ride;
exports.update_profile = update_profile;
exports.show_profile = show_profile;
exports.ride_history = ride_history;