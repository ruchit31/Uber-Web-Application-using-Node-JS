var mq_client = require('../rpc/client');


function newsignup(req,res)
{

	
	console.log("in new sign up");
	var email = req.param("email");
	var password = req.param("password");
	var first_name = req.param("first_name");
	var last_name = req.param("last_name");
	var mobile_country = req.param("mobile");
	console.log("hello"+email+password+first_name+last_name+mobile_country);
	
	var msg_payload = { "uemail": email, "upassword": password,"ufname": first_name,"ulname": last_name,"umobile": mobile_country };
	//console.log("In POST Request = UserName:"+ username+" "+password);
	mq_client.make_request('signuprider_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				
			res.render('userlogin');
			}
			else {    
				
				console.log("Invalid Login");
				//res.send({"login":"Fail"});
			}
		}  
	});
	
	
	
	
	
	
	
	
	
	
}


function sign_in(req,res) {

	res.render('signin');
}

function after_sign_in(req,res)
{
	// check user already exists
	//var getUser="select * from users where emailid='"+req.param("username")+"'";
	var username = req.param("username");
	var password = req.param("password");
	var msg_payload = { "username": username, "password": password };
		
	console.log("In POST Request = UserName:"+ username+" "+password);
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				
				res.send({"login":"Success"});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
	
}


function success_login(req,res)
{
	ejs.render('success_login');
}


function fail_login(req,res)
{
	res.render('fail_login');
}
function signuprider(req,res)
{
	res.render('newsignup');
}


exports.signuprider=signuprider;
exports.sign_in=sign_in;
exports.newsignup=newsignup;
exports.after_sign_in=after_sign_in;
exports.success_login=success_login;
exports.fail_login=fail_login;