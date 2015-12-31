
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , home = require('./routes/home')
  , userpage = require('./routes/userpage')
  , driver = require('./routes/driver')
  , path = require('path');
  
var app = express();
var redis =require("redis");

var client = redis.createClient(process.env.OPENSHIFT_REDIS_HOST,process.env.OPENSHIFT_REDIS_PORT);
client.auth('ZTNiMGM0NDI5OGZjMWMxNDlhZmJmNGM4OTk2ZmI5');
client.on('connect',function(){
	console.log('redis connected');
})

var expressSession = require("express-session");
var redisStore = require('connect-redis')(expressSession);
//var mongoStore = require("connect-mongo")(expressSession);
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({'secret': 'uber@teststring'}));
app.use(expressSession({
	secret: 'uber@teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	socketOptions: {keepAlive: 1} ,
    store: new redisStore({ host:process.env.OPENSHIFT_REDIS_HOST, port:process.env.OPENSHIFT_REDIS_PORT, pass:process.env.REDIS_PASSWORD,ttl:440})
	
	
	
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
client.hmset("framework1",{"user":"ruchit","password1":"123"});
client.hgetall('framework1',function(err, object) {
		    console.log(object);
		});


app.get('/', routes.index);
app.get('/signup_driver',routes.signupdriver);
app.post('/drive/signup',driver.driverSignUp);
app.get('/signin',routes.signin)
app.get('/userpage',userpage.user);
app.get('/sign',home.sign_in);
app.post('/sign', home.after_sign_in);
app.get('/success_login', home.success_login);
app.get('/fail_login', home.fail_login);
app.post('/newsignup', home.newsignup);
app.post('/userlogin',userpage.userlogin);
app.get('/userlogin1',userpage.userlogin1);
app.get('/driverlogin',driver.driverlogin);
app.post('/driverlogincheck',userpage.driverlogincheck);
app.get('/logout',userpage.logout);
app.get('/Request_Ride',routes.requestRide);
app.get('/signuprider',home.signuprider);
app.get('/ride_history',driver.ride_history);//done
app.get('/show_profile',driver.show_profile);//done
app.post('/update_profile',driver.update_profile);//done
app.get('/giveRating',driver.give_rating);
app.get('/fetch_rating',driver.fetch_rating);
//app.get('/show_bill',driver.show_bill);
//app.get('/show_reviewsnratings',driver.show_reviewsnratings);
//app.get('/start_ride',driver.start_ride); //done change method to post while integrating with controller 
//app.get('/end_ride',driver.end_ride); //done change method to post while integrating with controller
app.get('/upload_video',driver.upload_video); //done change method to post while integrating with controller
app.get('/view_video',driver.view_video);
//app.get('/upload_picture',driver.upload_picture);
app.post('/distance', userpage.distance);
app.post('/confirmDriver', userpage.confirmRide);
app.get('/startRide',userpage.startRide);
app.get('/checkRideStatus',userpage.checkRideStatus);
app.get('/updateRide',userpage.updateRide);
//app.get('/afterRideRequestPage', userpage.driverReq);
app.post('/updateRideCall',userpage.updateRideCall);
app.get('/userlandingpage',userpage.cancelRide);
app.get('/userlogin_admin',userpage.userlogin_admin);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP ||process.env.OPENSHIFT_ROCKMONGO_IP|| process.env.IP || "127.0.0.1");
app.post('/userlogin1_admin',userpage.userlogin_1_admin);
app.get('/showAllUser',userpage.showAllUser_admin);
app.post('/deleteUser',userpage.deleteUser_admin);
app.get('/userlogin1_admin',userpage.adminDeleteUser);
http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
    
});
