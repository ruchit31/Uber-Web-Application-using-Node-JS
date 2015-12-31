/**
 * New node file
 */

var mq_client = require('../rpc/client');
var mysql1 = require("./mysql1");
var mysql = require("./mysql");
var source1;
var https = require('https');
var rideresults=0;
exports.userlogin_admin = function(req, res){
	res.render('userlogin1_admin');
	};
exports.userlogin_1_admin = function(req, res){
		var email = req.param("email");
		var password = req.param("password");
		var results1="";
		
		
		if(email==="test" && password==="test"){
			res.render('admin_home',{results1:results1});
						 
					}
					else {    
						console.log("login fail");
						}
						
	}
exports.showAllUser_admin = function(req,res)
{
	
	var task = "showAllUser_admin";
	var msg_payload = { "task": task};
	
	mq_client.make_request('driver_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{   
			if(results.code==200){
				res.send({results:results});
			}
			else if(results.code==401) {  
				console.log('ride not yet started');
				res.send({results:"no user details available"});
				}
			}
		});  
	};	
	
exports.user = function(req, res){
  res.render('userlandingpage', { title: 'User' });
};

exports.userlogin1 = function(req, res){
res.render('userlogin');
};

exports.userlogin = function(req, res){
	var email = req.param("email");
	var pwd = req.param("password");
	var query="select uid from users where email='"+email+"' and password='"+pwd+"'";
	var conn=mysql1.getConnection();
	var query=conn.query("select uid from users where email='"+email+"' and password='"+pwd+"'",function(err,results){
    	//console.log(query.sql);
    	if(err){
    		console.error(err);
    }
     else{	
    	// console.log(JSON.parse(result2));
    	 if(results.length>0){
    	 //res1.code = "200";
    	 res.render('userlandingpage',{results : [],username:[]});
    	 //res1.userDetail = results;
    	// callback(null,res1);
    	 }
    	 else{
    		 //res1.code = "401";
	    	 //callback(null,res1);
    	 }
     }
    });
	/*conn.query("select uid from users where email='"+email+"' and password='"+pwd+"'");
	//mysql.fetchData(function(err,result){

		if(err){
			console.error(err);
	          }
	 else{
		    if(result.length > 0){
		    	res.render('userlandingpage',{results : [],username:[]});
		    }
		    else{
		    	console.log("wrong password");
		    }
	 }
		
	},query);*/
	
	
	
	
	
}
/*
exports.userlogin = function(req, res){
	var email = req.param("email");
	var pwd = req.param("password");
	var task = "login";
	var crypto = require('crypto'),

    algorithm = 'aes-256-ctr',

    password = 'd6F3Efeq';



function encrypt(text){

  var cipher = crypto.createCipher(algorithm,password);

  var crypted = cipher.update(text,'utf8','hex');

  crypted += cipher.final('hex');

  return crypted;

}

var password=encrypt(pwd);



	var msg_payload = { "email": email, "password": password , "task": "login"};
		
	console.log("In POST Request = UserName:"+ email+" "+password);
	var results=null;
	mq_client.make_request('user_queue',msg_payload, function(err,results){
		
		
		if(err){
			throw err;
		}
		else 
		{   var sqldata=results.data;
		console.log("other outside extra"+results.uid);
		
		   console.log("outside"+results.data);
			if(results.code == 200){
				console.log("valid Loginhjgghj");
				//console.log("valid Login"+results.records[0]);
				//console.log("inside"+results.data[0]);
				
				//req.session.email=email;
				//req.session.uid=results.uid;
				//req.session.ridesdata=sqldata;
				//console.log("extra"+results.uid);
					
				res.render('userlandingpage',{results:sqldata,username:[]});
				
				
				 
				 
			}
			else {    
				if(results.code==401){
				console.log("Invalid Login");
				
				
				}
				else{
					console.log("error");
					//res.render('userlandingpage',{results:[]});
				}
			}
		}  
	});
	
}*/
exports.driverlogincheck = function(req, res){
	var email = req.param("email");
	var password = req.param("password");
	var msg_payload = { "email": email, "password": password , "task": "driverlogin"};
		
	console.log("In POST Request = UserName:"+ email+" "+password);
	mq_client.make_request('driver_queue',msg_payload, function(err,result){
		
		   
			if(result.code == 200){
				console.log("driver found and coming");
				console.log("pickup source: "+source1);
				req.session.demail=email;
				req.session.did=result.did;
				res.render('driver',{results : source1});	
				
				}
			else {    
				
				if(results.code==401){
					console.log("Currently no ride req for this driver");
					res.render('driver',{results : "no current request"});
					//res.send({"login":"Fail"});
					}
					else{
						console.log("error");
					}
				
			}
		}  
	);
	
}

exports.distance = function(req,res)
{
	var https = require('https');
	var source = req.param("source");
	source1 = req.param("source");
	var destination = req.param("destination");
	source = source + " San Jose california";
    destination = destination + " San Jose california";
	var s1 = source.split(" ").join("+");
	var d1 = destination.split(" ").join("+");

	console.log("source: "+s1);
	console.log("destination: "+d1);
	
	var task = "chooseDriver";
	var msg_payload = { "source": s1, "destination": d1 , "task": task};
	console.log("In POST Request = source:"+ source+" destination: "+destination);
	mq_client.make_request('driver_queue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		}
		else 
		{   
			if(results.code==200){
				console.log("record exists");
				console.log("client side details: "+results.userDistance);
				console.log("driver name: "+results.drivers[0].name);
				console.log("expected bill amount"+results.billamount);
				console.log("Surge Factor"+results.surge);
				rideDriverDetail = results;
				res.send({results:results});
			}
			else {    
					console.log("error");
				}
			}
		});  
	};
	

exports.confirmRide = function(req,res){
			console.log("inside confirmRide func");
			var did = req.param("driverId");
			var source1 = req.param("source");
			console.log("selected source is"+source1);
			var destination = req.param("destination");
			var task = "confirmDriver";
			var msg_payload = { "did": did,"uid":req.session.uid,"source1":source1,"destination":destination, "uemail":req.session.email,"task": task};
			console.log("In POST Request = did:"+ did);
			mq_client.make_request('driver_queue',msg_payload, function(err,results){
				
				if(err){
					throw err;
				}
				else 
				{   
					if(results.code==200){
						console.log("driver confirmed");
						 res.send({results:results});
					}
					else {    
							console.log("error in confirmRide func");
						}
					}
				}); 
			
		}
		
		
		exports.checkRideStatus = function(req,res)
		{
			
			var task = "checkRideStatus";
			var msg_payload = { "task": task};
			
			mq_client.make_request('driver_queue',msg_payload, function(err,results){
				if(err){
					throw err;
				}
				else 
				{   
					if(results.code==200){
						console.log("ride started ");
						 res.send({results:"started"});
					}
					else if(results.code==401) {  
						console.log('ride not yet started');
						res.send({results:"notStarted"});
						}
					}
				});  
			};
			
			exports.updateRide = function(req, res){
				res.render('updateRide');
				};
	exports.startRide = function(req,res)
	{
		
		var task = "startRide";
		var msg_payload = { "task": task};
		
		mq_client.make_request('driver_queue',msg_payload, function(err,results){
			
			if(err){
				throw err;
			}
			else 
			{   
				if(results.code==200){
					console.log("ride started ");
					req.session.currentridedid=results.currentdid;
					 res.render('final',{results:"ride started"});
				}
				else {    
						console.log("error");
					}
				}
			});  
		};
		exports.updateRideCall = function(req,res)

		{

		var source = req.param("source");


		var destination = req.param("destination");

		source = source + " San Jose california";

		    destination = destination + " San Jose california";

		var s1 = source.split(" ").join("+");

		var d1 = destination.split(" ").join("+");



		console.log("source: "+s1);

		console.log("destination: "+d1);


		var task = "updateRideCall";

		var msg_payload = { "source": s1, "destination": d1 , "task": task};

		console.log("In POST Request = source:"+ source+" destination: "+destination);

		mq_client.make_request('driver_queue',msg_payload, function(err,results){


		if(err){

		throw err;

		}

		else 

		{   

		if(results.code==200){

		console.log("updated ride record exists");

		res.send({results:results});

		}

		else {    

		console.log("error");

		}

		}

		});  

		};

		exports.checkRideStatus = function(req,res)

		{


		var task = "checkRideStatus";

		var msg_payload = { "task": task};


		mq_client.make_request('driver_queue',msg_payload, function(err,results){

		if(err){

		throw err;

		}

		else 

		{   

		if(results.code==200){

		console.log("ride started ");

		res.send({results:"started"});

		}

		else if(results.code==401) {  

		console.log('ride not yet started');

		res.send({results:"notStarted"});

		}

		}

		});  

		};


		exports.updateRide = function(req, res){

		res.render('updateRide');

		};	
		exports.cancelRide = function(req, res){
			res.render('userlandingpage',{results:req.session.ridesdata,username:req.session.email});
		};
		exports.deleteUser_admin = function(req,res)
		{
			var uid = req.param("uid");
			console.log("uid: "+uid);
			var task = "deleteUser_admin";
			var msg_payload = {uid:uid, "task": task};
			
			mq_client.make_request('driver_queue',msg_payload, function(err,results){
				if(err){
					throw err;
				}
				else 
				{   
					if(results.code==200){
						res.send({results:results});
					}
					else if(results.code==401) {  
						console.log('ride not yet started');
						res.send({results:"no user details available"});
						}
					}
				});  
			};
			
			exports.adminDeleteUser = function(req, res){
				res.render('admin_home');
				};
			
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/userlogin1');
};
