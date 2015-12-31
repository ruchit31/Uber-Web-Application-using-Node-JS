
var mongo = require("./mongo");
var mysql = require("./mysql");
var mysql2= require("./mysql2");
var redis=require('redis');
var client=redis.createClient(6379,'127.0.0.1')
client.on('connect',function(){
	
	console.log('redis sis connected');
	
	
});
function handle_request1(msg, callback){
console.log("stage2");


console.log("In handle request:"+ msg.email);

console.log("In handle request:"+ msg.password);

var crypto = require('crypto'),

algorithm = 'aes-256-ctr',

password = 'd6F3Efeq';







function decrypt(text){

var decipher = crypto.createDecipher(algorithm,password);

var dec = decipher.update(text,'hex','utf8');

dec += decipher.final('utf8');

return dec;

}

console.log("decrypted password"+msg.password);
    //query=select uid from users where email='"+email+"' and password='"+pwd+"'"
query = "select uid from users where email='"+msg.email+"' and password='"+decrypt(msg.password)+"'";
var res = {};
mysql2.fetchData(function(err,results){
if(err){
console.log("i am in error")
throw err;
}
else 
{  
 
    if(results){
   
   // console.log(re[0]); 
    /*query1 = "select d_name,b_amount,r_destination,dateoftravel,timeoftravel,r_source,rating from nodejsserver.rides where u_id='"+results[0].uid+"'";
    res.uid=results[0].uid;
    mysql.fetchData(function(err,results1){
    console.log(results1);
    if(results1.length > 0){
    console.log("in server uid is ");
   // res.records = results;
res.code = "200";
res.value = "Succes Login"
res.data = results1;


    }
    else{
    
res.data = "no rides available";
    
    }
    callback(null,res);
    }, query1);*/
res.code = "200";
res.value = "Succes Login"
res.data = [];
callback(null,res);
    }
    else{
    res.code = "401";
res.value = "Failure Login";
callback(null,res);
    }
}
   

}, query);
}


function signup_rider(msg, callback){

var res = {};

console.log("In handle signup_rider:"+ msg.uemail);

console.log("In handle signup_rider:"+ msg.upassword);


var query1="insert into nodejsserver.users values ('','"+msg.ufname+"', '"+msg.ulname+"','"+msg.uemail+"','"+msg.upassword+"','"+msg.umobile+"')";
mysql.fetchData(function(err,results){
console.log(query1.sql);
if(err){
console.error(err);
//console.log("4rr");
res = {"code" : 401};
   
callback(null,res);
}
else{
console.log('no error');
res = {"code" : 200};

callback(null,res);
}
},query1);
}





exports.signup_rider = signup_rider;
exports.handle_request1 = handle_request1;
