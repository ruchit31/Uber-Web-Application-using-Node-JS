/**
 * 
 */

var ejs= require('ejs');
var mysql = require('mysql');
var arrayOfPools= [];
var Queue = [];
var max = 2000; 
var j = 0;

function getConnection(){
	var connection = mysql.createConnection({
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		//socketPath : process.env.OPENSHIFT_MYSQL_DB_SOCKET,
		port:3306,
		database: 'Uber'
	});
	return connection;
}
for(var i=0;i< max; i++){
	var connection=getConnection();
	arrayOfPools.push(connection);
}
function getConnectionFromPool(){
	var connection = arrayOfPools.pop();
	return connection;
}
function releaseConnectionFromPool(connection){
	arrayOfPools.push(connection);
}
function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnectionFromPool();
	/*if(getConnectionFromPool().length == 0){
		Queue.push(sqlQuery);
	}*/
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			releaseConnectionFromPool(connection);
			callback(err, rows);
		}
	});
	
}	

exports.fetchData=fetchData;