var express = require('express');
var user = require('./user');
var router = express.Router();

router.get('/',function(req,res){
	if(req.session.user){
        res.redirect('/');
    }else{
        res.render('register');
    }  
});
router.post('/',function(req,res){
	var name=req.body.name;
	var passwd=req.body.passwd;
	var data;
	user.select(name).then(function(_res){
		if(_res.length == 0){
			user.add(name,passwd).then(function(res1){
				data={
					"code":0,
					"msg":"注册成功"
				}
				req.session.user = name;
				res.send(data);
			},function(err){
				data={
					"code":0,
					"msg":"注册失败"
				}
				res.send(data);
			});
		}else{
			data={
				"code":-1,
				"msg":"该用户已存在"
			}
			res.send(data);
		}
	},function(err){
		data={
			"code":-2,
			"msg":"注册失败"
		}
		res.send(data);
	});
});

module.exports = router;