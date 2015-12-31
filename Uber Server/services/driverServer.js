var mongo = require("./mongo");
var mysql = require("./mysql");
var mysql1 = require("./mysql1");
var mongoURL = "mongodb://admin:xXWQaU83LZhD@localhost:27017/nodejsserver";
var driver_list  = new Array();
var driver_within_10_global= new Array();
var count=0;
var source1="";
var destination1="";
var did_global=0;
var distsourceanddest=1;
var sourcetodesttime=1;
var https = require("https");

function ride_history(msg, callback){
	var d_id = msg.d_id;
	var res = {};
	console.log("In rides history Server:"+ d_id);
	var fetchhistory = "Select * from nodejsserver.rides where d_id =" + "'" + d_id + "'" + ";"; 
	mysql.fetchData(function(err,result){
		if(result){
			console.log(result);
			res =  result;
		}
		else{
			//console.log(result);
			res.code = "Failed history fetch";
		}
		callback(null, res);	
	},fetchhistory);
}
exports.showAllUser_admin = function(msg, callback){
	
	console.log("inside showAllUser_admin func");
	var res1 = {};
	var conn=mysql1.getConnection();
	
    var query=conn.query("select * from users ",function(err,results){
    	//console.log(query.sql);
    	if(err){
    		console.error(err);
    }
     else{	
    	// console.log(JSON.parse(result2));
    	 if(results.length>0){
    	 res1.code = "200";
    	 res1.userDetail = results;
    	 callback(null,res1);
    	 }
    	 else{
    		 res1.code = "401";
	    	 callback(null,res1);
    	 }
     }
    });
};
function show_profile(msg, callback){
	var d_id = msg.d_id;
	var res = {};
	console.log("In show Profile " + d_id);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Driver');
		//var ObjectID = require('mongodb').ObjectID;
		coll.findOne({d_id: d_id},function(err, response){
			if (response) {
				console.log("in if block");
				console.log(response);
				res =  response;
			}
			else{
				console.log("in else block");
				console.log(response);
				res.code = "401";
				res.value = "Failed group Fetch";
			}
	callback(null, res);
		});
	});
}


function driver_rating(msg,callback){
	var r_id = msg.r_id;
	var rating = msg.rating;
	var res = {};
	var newrating = "update rides set rating = '" + rating + "' where r_id = '" + r_id + "';";
	mysql.fetchData(function(err,result){
		if(result){
			console.log(result);
			res =  result;
		}
		else{
			//console.log(result);
			res.code = "Failed";
		}
		callback(null, res);	
	},newrating);

}

function fetchRating(msg,callback){
	var d_id = msg.d_id;
	var res = {};
	var driverRating = "SELECT AVG(rating) as averageRating FROM rides where d_id ='" + d_id + "';";
	mysql.fetchData(function(err,result){
		if(result){
			console.log(result);
			res =  result;
		}
		else{
			
			res.code = "Failed";
		}
		callback(null, res);	
	},driverRating);
}

function update_profile(msg,callback){
	var d_id = msg.d_id;		
	var d_fname = msg.d_fname;
	var d_lname = msg.d_lname;
	var ssn = msg.ssn;
	var car_number = msg.car_number;
	var insurance_number = msg.insurance_number;
	var res = {};
	console.log("In update Profile " + d_id);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Driver');
		//var ObjectID = require('mongodb').ObjectID;
		coll.update({d_id:d_id},{$set:{d_fname:d_fname, d_lname:d_lname, ssn:ssn, car_number:car_number, insurance_number:insurance_number}},function(err, response){
			if (response) {
				console.log("in if block");
				console.log(response);
				res =  response;
			}
			else{
				console.log("in else block");
				console.log(response);
				res.code = "401";
				res.value = "Failed group Fetch";
			}
	callback(null, res);
		});
	});
}
/*
exports.startRide = function(msg, callback){

    

    console.log("inside startRide func");

    var res1 = {};

var conn=mysql1.getConnection();



    var query=conn.query("update rides set r_status=1 where d_id="+did_global+" and r_status=0",function(err,results){

    console.log(query.sql);

	   

    if(err){

    console.error(err);

    }

	    else{

	   	if(results){

	   	res1.code="200";

	   	callback(null,res1);

	   	}

	   	else{

	   	res1.code="401";

	   	callback(null,res1);

	   	}

	    }

    });

    

    };*/

function end_ride(msg, callback){
	var r_id = msg.r_id;
	var res = {};
	console.log("In end  ride Server:"+ r_id);
	//Changing ride status to -1 as ride ends.  on creation of ride status must be 0.
	//Other function may also get triggered here such as creation of bill.
	var endRide = "update rides set r_status ='-1' where r_id = " + "'" + r_id + "'" + ";"; 
	mysql.fetchData(function(err,result){
		if(result){
			console.log(result);
			res =  result;
		}
		else{
			//console.log(result);
			res.code = "Failed history fetch";
		}
		callback(null, res);	
	},endRide);
}


function upload_video(msg, callback){
	var d_id = msg.d_id;
	var video_link = msg.video_link;
	var res = {};
	console.log("In upload video " + d_id);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Driver');
		coll.update({d_id:d_id},{$set:{video_link:video_link}},function(err, response){
			if (response) {
				console.log("response is there");
				console.log(response);
				res =  response;
			}
			else{
				console.log("in else block");
				console.log(response);
				res.code = "401";
				res.value = "Failed group Fetch";
			}
	callback(null, res);
		});

	});
}

function view_video(msg, callback){
	var d_id = msg.d_id;
	var pic1 = msg.pic1;
	var res = {};
	console.log("In view video " + d_id);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Driver');
		coll.find({"d_id":d_id},{video_Link:1},function(err, response){
			if (response) {
				console.log("response is there in view video");
				console.log(response);
				res =  response;
			}
			else{
				console.log("in else block");
				console.log(response);
				res.code = "401";
				res.value = "Failed video Fetch";
			}
	callback(null, res);
		});

	});
}

function upload_picture(msg, callback){
	var d_id = msg.d_id;
	var res = {};
	console.log("In view video " + d_id);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Driver');
		coll.find({"d_id":d_id},{video_Link:1},function(err, response){
			if (response) {
				console.log("response is there in view video");
				console.log(response);
				res =  response;
			}
			else{
				console.log("in else block");
				console.log(response);
				res.code = "401";
				res.value = "Failed video Fetch";
			}
	callback(null, res);
		});

	});
}



exports.chooseDriver = function(msg, callback){

	var driver_list  = new Array();

	var driver_within_10= new Array();


	    console.log("inside chooseDriver func");

	    var res1 = {};

	    source1=msg.source.split("+").join(" ");

	    destination1=msg.destination.split("+").join(" ");

	    console.log("source location: "+ msg.source);

	    console.log("destination location: "+ msg.destination);

	    

	    https.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+msg.source+'&destinations='+msg.destination+'&mode=Driving&language=fr-FR&key=AIzaSyDMPbktYAm7BXNzz0AjxezVmZjV1zlykK4', function(res) {



	    res.on('data', function(d) {



	    console.log("data");

	        console.log(d.toString());

	        console.log("travel distance: "+JSON.parse(d).rows[0].elements[0].distance.value/1600);

	    	   

	    res1.userDistance = JSON.parse(d).rows[0].elements[0].distance.value/1600;

	    res1.duration = JSON.parse(d).rows[0].elements[0].duration.text;
	    
	    distsourceanddest=res1.userDistance;
	    console.log("duration: "+res1.duration);
        sourcetodesttime=res1.duration.split(" minutes").join("");;
        console.log("after split: "+sourcetodesttime);
	    var conn=mysql1.getConnection();

	    
		var currentdate = new Date();
	   	var billid = currentdate.getDate()+
	    + (currentdate.getMonth()+1)
	    + currentdate.getFullYear()  
	    + currentdate.getHours()   
	    + currentdate.getMinutes()  
	    + currentdate.getSeconds();
	   	var traveldate=currentdate.getDate() + "/"
	    + (currentdate.getMonth()+1)  + "/" 
	    + currentdate.getFullYear() ;
	   	var traveltime=currentdate.getHours() + ":"  
	    + currentdate.getMinutes() + ":" 
	    + currentdate.getSeconds();
	   
		var billamount1=2;
	   	var dayvariable= 1;
	   	var timevariable =1;
	   	var numberofdrivers=driver_within_10_global.length;
	   var drivervariable=1;
	   
	  
	   	if(currentdate.getDay()==0 ||currentdate.getDay()==5||currentdate.getDay()==6){
	   		dayvariable=1.5;
	   	}
	   	if(currentdate.getHours >=10 && currentdate.getHours <= 12 || currentdate.getHours >=20 && currentdate.getHours <= 24 )
	    {
	   	timevariable=2.0;	
	   	}   	
	   	if(numberofdrivers <= 3){
	   		drivervariable=1.5;	
	   	}
	   	
	   			var samplebillamount=eval(billamount1+distsourceanddest+sourcetodesttime);
	   			billamount=eval(samplebillamount+(samplebillamount*dayvariable)+(samplebillamount*timevariable)+(samplebillamount*drivervariable));
	   			res1.billamount=billamount;
	   			res1.surge=dayvariable+timevariable+drivervariable;
	   //	console.log("dayvariable"+dayvariable+"timevariable"+timevariable+"bill"+billamount*dayvariable)
	   	
	   // res1.expectedbill=billamount;
	   // res1.surge=dayvariable*timevariable*drivervariable;

	        var query=conn.query("select did as id, dname as name, source as location from drivers;",function(err,result){

	        console.log(query.sql);

	    	   

	        if(err){

	        console.error(err);

	        }

	    	    else{

	         

	 	var j = 0;

	 	var l = 0;

	 	while(j < result.length)

	 	{ 

	 	driver_list.push({

	 	 	  id: result[j].id,

	 	 	  name: result[j].name,

	 	 	  location : result[j].location

	 	});

	 	  j++;

	 	}

	 

	 	for(var i in driver_list){

	 	(function(i){

	 	var d1 = driver_list[i].location.split(" ").join("+");

	 	var s1 = msg.source;

	 	//console.log("source: "+s1);



	 	console.log("check running count");



	 	https.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+s1+'&destinations='+d1+'&mode=Driving&language=fr-FR&key=AIzaSyDMPbktYAm7BXNzz0AjxezVmZjV1zlykK4', function(res) {

	 

	 	console.log("check running count1");

	 

	 	res.on('data', function(doop) {



	 	//console.log("data");

	 	var obj = JSON.parse(doop);

	 	console.log("count: "+count);

	 

	 	count=count+1;

	 	if(obj.rows[0].elements[0].distance.value <= 10000){

	 	 

	 	console.log("driver location: " + driver_list[i].location);

	 	console.log("driver name: " + driver_list[i].name);

	 	console.log("distance from driver: "+obj.rows[0].elements[0].distance.value/1600);

	 

	 	driver_within_10.push({

	 	 	  id: driver_list[i].id,

	 	 	  name: driver_list[i].name,

	 	 	  location : driver_list[i].location,

	 	 	  user_loc : s1,

	 	 	  distance_from_user : (obj.rows[0].elements[0].distance.value)/1600,

	 	      time_gap : (obj.rows[0].elements[0].duration.value)/60

	 	});

	 	}

//	 	need to change it with total number of drivers

	 	if(count==driver_list.length){

	 

	 	res1.drivers = driver_within_10;

	 	res1.code="200";

	 	console.log("length is " + driver_within_10.length);

//	 	driver_within_10=null;

	 	driver_within_10_global=driver_within_10;

	 	callback(null,res1);

	 	}

	 	});

	 

	 	}).on('error', function(e) {

	 	console.error(e);

	 	});

	 	})(i);

	 	}

	 

	            }

	    	   

	            });

	    

	     

	    });

	    }).on('error', function(e) {



	    console.error(e);



	    });

	    

	    };
function handle_requestdriver(msg, callback){
	
	   var res={};

		console.log("In handle request:"+ msg.email);

		console.log("In handle request:"+ msg.password);


		query = "select did from nodejsserver.driverdetails where demail='"+msg.email+"' and dpassword='"+msg.password+"'";
	
		mysql.fetchData(function(err,loginresults){
			
			if(loginresults){
			res.code = "200";
			query1="select r_id from rides where d_id="+loginresults[0].did+" and r_status=0";
			res.did=loginresults[0].did;
			mysql.fetchData(function(err,rideresults){
				if(err){
		    		console.error(err);
		    }
		     else{
		    	 if(rideresults.length>0){
		    		 res.rides="200";
		    	 }
		    	 else{
		    		 res.rides="401";
		    		 console.log("no ride req for this driver");
		    	 }
		     }
			},query1);
			}
			else{
			res.code = "401";
			
			}
			callback(null,res);
			
			},query);
		
	}
exports.confirmDriver = function(msg, callback){

    

    console.log("inside confirmDriver func");

    var res1 = {};

    console.log("Driver id: "+ msg.did);

    //console.log("Driver id: "+ msg.source);

var conn=mysql1.getConnection();



    var query=conn.query("select dname as name, car_type as type, car_color as color from drivers where did="+msg.did,function(err,result2){

    //console.log(query.sql);

   

    if(err){

    console.error(err);

    }

    else{

    // console.log(JSON.parse(result2));

     

   	res1.code = "200";

   	res1.dname = result2[0].name;

   	res1.car_type = result2[0].type;

   	console.log("car_type: "+result2[0].type);

   	res1.car_color = result2[0].color;

   	console.log("car_color: "+result2[0].color);

     

   	for(var i=0; i<driver_within_10_global.length;i++){

   	if(msg.did==driver_within_10_global[i].id){

   	res1.distance = driver_within_10_global[i].distance_from_user;

   	res1.expected_time = driver_within_10_global[i].time_gap;

   	}

   	}

   	did_global=msg.did;
   	var currentdate = new Date();
   	var billid = currentdate.getDate()+
    + (currentdate.getMonth()+1)
    + currentdate.getFullYear()  
    + currentdate.getHours()   
    + currentdate.getMinutes()  
    + currentdate.getSeconds();
   	var traveldate=currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() ;
   	var traveltime=currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
   
   	var billamount=2;
   	var dayvariable= 1;
   	var timevariable =1;
   	var numberofdrivers=driver_within_10_global.length;
   var drivervariable=1;
   
  
   	if(currentdate.getDay()==0 ||currentdate.getDay()==5||currentdate.getDay()==6){
   		dayvariable=1.5;
   	}
   	if(currentdate.getHours >=10 && currentdate.getHours <= 12 || currentdate.getHours >=20 && currentdate.getHours <= 24 )
    {
   	timevariable=2.0;	
   	}   	
   	if(numberofdrivers <= 3){
   		drivervariable=1.5;	
   	}
   	
   			var samplebillamount=eval(billamount+distsourceanddest+sourcetodesttime);
   			billamount=eval(samplebillamount+(samplebillamount*dayvariable)+(samplebillamount*timevariable)+(samplebillamount*drivervariable));
   			
   	
   	var query=conn.query("insert into rides values("+billid+",'"+source1+"','"+destination1+"',"+msg.did+","+billid+","+billamount+",1,'"+result2[0].name+"',"+msg.uid+",'"+traveldate+"','"+traveltime+"',2,2,"+distsourceanddest+","+sourcetodesttime+",null)",function(err,result2){

    console.log(query.sql);

    if(err){

    console.error(err);

    }

 	    else{

    console.log("ride inserted into table");

//	    for(var j=0; j<driver_within_10.length;j++){

//	    driver_within_10.pop();

//	}

 	   

    callback(null,res1);

 	    }

    });	     

    }

    });

    

    };


exports.startRide = function(msg, callback){

        

        console.log("inside startRide func");

        var res1 = {};

    var conn=mysql1.getConnection();

    

        var query=conn.query("update rides set r_status=1 where d_id="+did_global+" and r_status=0",function(err,results){

        console.log(query.sql);

    	   

        if(err){

        console.error(err);

        }

    	    else{

    	   	if(results){

    	   	res1.code="200";
    	   	res1.currentdid=did_global;

    	   	callback(null,res1);

    	   	}

    	   	else{

    	   	res1.code="401";

    	   	callback(null,res1);

    	   	}

    	    }

        });

        

        };
exports.checkRideStatus = function(msg, callback){

        

        console.log("inside checkRideStatus func");

        var res1 = {};

    var conn=mysql1.getConnection();

    

        var query=conn.query("delete from rides where d_id="+did_global+" and u_id=1 and r_status=0",function(err,results){

        console.log(query.sql);

    	   

        if(err){

        console.error(err);

        }

    	    else{

    	   	if(results){

    	   	res1.code="200";

    	   	callback(null,res1);

    	   	}

    	   	else{

    	   	res1.code="401";

    	   	callback(null,res1);

    	   	}

    	    }

        });

        

        };

        

        

        exports.updateRideCall = function(msg, callback){

        

            console.log("inside updateRideCall func");

            var res1 = {};

            

            console.log("source location: "+ msg.source);

            console.log("destination location: "+ msg.destination);

            

            https.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+msg.source+'&destinations='+msg.destination+'&mode=Driving&language=fr-FR&key=AIzaSyDMPbktYAm7BXNzz0AjxezVmZjV1zlykK4', function(res) {



            res.on('data', function(d) {



            console.log("data");

                console.log(d.toString());

                console.log("updated ride travel distance: "+JSON.parse(d).rows[0].elements[0].distance.value/1600);

                console.log("updated ride travel time: "+JSON.parse(d).rows[0].elements[0].duration.text);

                res1.code="200";

            res1.userDistance = JSON.parse(d).rows[0].elements[0].distance.value/1600;

            res1.duration = JSON.parse(d).rows[0].elements[0].duration.text;

            res1.source=msg.source.split("+").join(" ");

            res1.destination=msg.destination.split("+").join(" ");

            var d1 = msg.destination.split("+").join(" ");

            var conn=mysql1.getConnection();

            

                var query=conn.query("update rides set r_destination='"+d1+"' where d_id='"+did_global+"' and u_id=1 and r_status=1",function(err,results){

            	   

                console.log(query.sql);

            	   

                if(err){

                console.error(err);

                }

            	    else{

            	   	if(results){

            	   	res1.code="200";

            	   	callback(null,res1);

            	   	}

            	   	else{

            	   	res1.code="401";

            	   	callback(null,res1);

            	   	}

            	    }

                });

            

            callback(null,res1);

            });

            }).on('error', function(e) {



            console.error(e);



            });

            

            };
    
exports.showAllUser_admin = function(msg, callback){
            	
            	console.log("inside showAllUser_admin func");
            	var res1 = {};
            	var conn=mysql1.getConnection();
        		
        	    var query=conn.query("select * from users ",function(err,results){
        	    	//console.log(query.sql);
        	    	if(err){
        	    		console.error(err);
        	    }
        	     else{	
        	    	// console.log(JSON.parse(result2));
        	    	 if(results.length>0){
        	    	 res1.code = "200";
        	    	 res1.userDetail = results;
        	    	 callback(null,res1);
        	    	 }
        	    	 else{
        	    		 res1.code = "401";
            	    	 callback(null,res1);
        	    	 }
        	     }
        	    });
            };
exports.deleteUser_admin = function(msg, callback){
            	
            	console.log("inside deleteUser_admin func");
            	var res1 = {};
            	var conn=mysql1.getConnection();
        		
        	    var query=conn.query("delete from users where uid="+msg.uid,function(err,results){
        	    	console.log(query.sql);
        	    	if(err){
        	    		console.error(err);
        	    }
        	     else{	
        	    	// console.log(JSON.parse(result2));
        	    	 if(results){
        	    	 res1.code = "200";
        	    	 callback(null,res1);
        	    	 }
        	    	 else{
        	    		 res1.code = "401";
            	    	 callback(null,res1);
        	    	 }
        	     }
        	    });
            };
            
function signUp_Driver(msg,callback){
            	var first_name = msg.first_name;
            	var last_name = msg.last_name;
            	var email = msg.email;
            	var phone = msg.phone;
            	var password = msg.password;
            	var city_name = msg.city_name;
            	
            	var res = {};
            	//console.log("In rides history Server:"+ d_id);
            	//var createAccount = "select * from driverdetails;";
            	var createAccount = "INSERT INTO `nodejsserver`.`driverdetails` (`dname`, `phonenumber`, `demail`, `dpassword`, `dstatus`, `dlastname`, `dcity`) VALUES (" 
            		+ "'" + first_name + "', '" + phone + "', '" + email + "', '" + password + "', '" + 0 + "', '" + last_name + "', '" + city_name + "');"; 
            	mysql.fetchData(function(err,result){
            		if(result){
            			console.log(result);
            			res =  result;

            		}
            		else{
            			//console.log(result);
            			res.code = "Failed Driver SignUp";
            		}
            		callback(null, res);	
            	},createAccount);
            }
function signUp_DriverMongo(msg,callback){
	var d_id = msg.d_id;
	var first_name = msg.first_name;
	var res = {};
	console.log("In insert d_id to mongo as well  " + d_id);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('Driver');
		//var ObjectID = require('mongodb').ObjectID;
		coll.insert({d_id: d_id, d_fname:first_name},function(err, response){
			if (response) {
				console.log("in if block");
				console.log(response);
				res =  response;
			}
			else{
				console.log("in else block");
				console.log(response);
				res.code = "401";
				res.value = "Failed group Fetch";
			}
	callback(null, res);
		});
	});
}
exports.signUp_DriverMongo=signUp_DriverMongo;
exports.handle_requestdriver=handle_requestdriver;	
exports.signUp_Driver = signUp_Driver;
exports.upload_picture = upload_picture;
exports.view_video = view_video;
exports.upload_video = upload_video;
exports.end_ride = end_ride;
exports.update_profile = update_profile;
exports.show_profile = show_profile;
exports.ride_history = ride_history;