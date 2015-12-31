var mysql = require("mysql");
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

exports.getConnection = getConnection;