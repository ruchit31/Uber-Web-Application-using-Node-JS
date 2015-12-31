
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , amqp = require('amqp')
  , util = require('util');

var driverServer = require('./services/driverServer');
var login = require('./services/login');

//var mqUrl = process.env.CLOUDAMQP_URI || process.env.CLOUDAMQP_HTTP_API_URI || "amqp://qftsukch:n78SUrAFSKMkfIUOeZKlNoNoQXI6seT7@moose.rmq.cloudamqp.com/qftsukch";
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_ROCKMONGO_PORT || process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP||process.env.OPENSHIFT_ROCKMONGO_IP|| "127.0.0.1");

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
    //server();
});

//var cnn = amqp.createConnection({url:mqUrl});
var cnn = amqp.createConnection({host:'127.0.0.1'});
cnn.on('ready', function(){
	

console.log("listening on login_queue");

cnn.queue('user_queue', function(q){
console.log("inside queue1");
q.subscribe(function(message, headers, deliveryInfo, m){
util.log(util.format( deliveryInfo.routingKey, message));
util.log("Message: "+JSON.stringify(message));
util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
var t = message.task;
console.log(t);
if(t == "login"){
console.log("before call");
login.handle_request1(message, function(err,res){
//return index sent
cnn.publish(m.replyTo, res, {
contentType:'application/json',
contentEncoding:'utf-8',
correlationId:m.correlationId
});

});
}
});
});

cnn.queue('driver_queue', function(q){
	q.subscribe(function(message, headers, deliveryInfo, m){
		util.log(util.format( deliveryInfo.routingKey, message));
		util.log("Message: "+JSON.stringify(message));
		util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
		console.log("task is " + message.task);
		var t = message.task;
		if(t === "rideHistory"){
			console.log(" Going to Driver Server ride history");
			driverServer.ride_history(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "showprofile"){
			console.log(" Going to Driver Server show Profile");
			driverServer.show_profile(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "updateprofile"){
			console.log(" Going to Driver Server update Profile");
			driverServer.update_profile(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "startride"){
			console.log(" Going to Driver Server start ride");
			driverServer.start_ride(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "endride"){
			console.log(" Going to Driver Server end ride");
			driverServer.end_ride(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		
		else if(t === "showreviewsnratings"){
			console.log(" Going to Driver Server show reviews and ratings");
			driverServer.end_ride(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		
		else if(t === "uploadVideo"){
			console.log(" Going to Driver upload video");
			driverServer.upload_video(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		
		else if(t === "fetchVideo"){
			console.log(" Going to fetch video");
			driverServer.view_video(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}			
		else if(t === "uploadPictures"){
			console.log(" Going to upload Pictures");
			driverServer.upload_picture(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "fetchBill"){
			console.log(" Going to fetch a particualr Bill");
			driverServer.upload_picture(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "chooseDriver")
		{
		    console.log("inside value of t: " + t);
			driverServer.chooseDriver(message, function(err,res){
				
		   console.log("inside chooseDriver server");
		   console.log("server.replyto "+ m.replyTo);
		    console.log("server.id "+ m.correlationId);
			//return index sent
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
			//console.log("Login queue ends");
		}
		else if(t  == "driverlogin"){
			console.log("going to driver login");
			driverServer.handle_requestdriver(message, function(err,res){
				
			//return index sent
			cnn.publish(m.replyTo, res, {
			contentType:'application/json',
			contentEncoding:'utf-8',
			correlationId:m.correlationId
			});

			});
			}
		else if(t === "confirmDriver")
		{
		    console.log("inside confirmDriver, value of t: " + t);
		    driverServer.confirmDriver(message, function(err,res){
				console.log("response from callback" + res);
				
           console.log("inside chooseDriver server");
           console.log("server.replyto "+ m.replyTo);
            console.log("server.id "+ m.correlationId);
			//return index sent
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
			//console.log("Login queue ends");
		}
		
		else if(t === "driveReq")
		{
		    console.log("inside driveReq, value of t: " + t);
		    driverServer.driveReq(message, function(err,res){
				console.log("response from callback" + res);
				
           console.log("inside chooseDriver server");
           console.log("server.replyto "+ m.replyTo);
            console.log("server.id "+ m.correlationId);
			//return index sent
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
			//console.log("Login queue ends");
		}
		
		else if(t === "startRide")
		{
		    console.log("inside startRide, value of t: " + t);
		    driverServer.startRide(message, function(err,res){
				console.log("response from callback" + res);
				
           console.log("inside chooseDriver server");
           console.log("server.replyto "+ m.replyTo);
            console.log("server.id "+ m.correlationId);
			//return index sent
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
			//console.log("Login queue ends");
		}
		else if(t === "checkRideStatus")
		{
		    console.log("inside checkridestatus, value of t: " + t);
		    driverServer.checkRideStatus(message, function(err,res){
				console.log("response from callback" + res);
				
           console.log("inside chooseDriver server");
           console.log("server.replyto "+ m.replyTo);
            console.log("server.id "+ m.correlationId);
			//return index sent
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
			//console.log("Login queue ends");
		}
		else if(t === "updateRideCall")
		{
		    console.log("inside updateRidecall, value of t: " + t);
		    driverServer.updateRideCall(message, function(err,res){
				console.log("response from callback" + res);
				
           console.log("inside chooseDriver server");
           console.log("server.replyto "+ m.replyTo);
            console.log("server.id "+ m.correlationId);
			//return index sent
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
			//console.log("Login queue ends");
		}
		else if(t === "showAllUser_admin")
		{
		    console.log("inside showAllUser_admin, value of t: " + t);
			login.showAllUser_admin(message, function(err,res){
				console.log("response from callback" + res);
				
           console.log("inside chooseDriver server");
           console.log("server.replyto "+ m.replyTo);
            console.log("server.id "+ m.correlationId);
			//return index sent
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
			//console.log("Login queue ends");
		}
		else if(t === "deleteUser_admin")
		{
		    console.log("inside deleteUser_admin, value of t: " + t);
			login.deleteUser_admin(message, function(err,res){
				console.log("response from callback" + res);
				
           console.log("inside chooseDriver server");
           console.log("server.replyto "+ m.replyTo);
            console.log("server.id "+ m.correlationId);
			//return index sent
			cnn.publish(m.replyTo, res, {
				contentType:'application/json',
				contentEncoding:'utf-8',
				correlationId:m.correlationId
			});
		});
			//console.log("Login queue ends");
		}
		else if(t === "SignUpDriver"){
			console.log(" Going to SignUp Driver");
			driverServer.signUp_Driver(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "signUpInsetIdMongo"){
			console.log(" Going to SignUp Driver in Mongo");
			driverServer.signUp_DriverMongo(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "giveRating"){
			console.log(" Going to Give rating to driver");
			driverServer.driver_rating(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		else if(t === "fetchRating"){
			console.log(" Going to Give rating to driver");
			driverServer.fetchRating(message, function(err,res){
				console.log(" Going to Driver Server");
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		}
		
		
	});
});



});














