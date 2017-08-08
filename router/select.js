var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "my_blog"
});
connection.connect();

exports.select=function(query,value,callback){	
	connection.query(query, value,function(err, result) {
	    callback(err, result);
	});
}

exports.add=function(query,value,callback){	
	connection.query(query, value,function(err, result) {
	    callback(err, result);
	});
}