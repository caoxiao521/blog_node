var db = require('./select');

var base = function(query,value){
	return new Promise(function(resolve,reject){
		db.select(query,value,function(err,res){
			if(err){
				reject(err);
			}else{
				resolve(res);				
			}
		})
	});	
}

var user = {
	select:function(name){
		var query = 'SELECT * FROM user WHERE name = ?';
		return base(query,name);	
	},
	add:function(name,passwd){
		var query = 'INSERT INTO user(name,passwd) VALUES(?,?)';
		return base(query,[name,passwd]);
	}
}

module.exports = user;