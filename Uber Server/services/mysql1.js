var mysql = require("mysql");
function getConnection(){
		var connection = mysql.createConnection({
			host: process.env.OPENSHIFT_MYSQL_DB_HOST,
			user: 'admin7UQsqRW',
			password: 'btew5WL7Fmel',
			socketPath : process.env.OPENSHIFT_MYSQL_DB_SOCKET,
			port:3306,
			database: 'nodejsserver'
		});
		return connection;
}

exports.getConnection = getConnection;