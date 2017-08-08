var express = require('express');
var user= require('./user');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.user){
        res.redirect('/');
    }else{
        res.render('login');
    }    
});

router.post('/', function(req, res, next) {    
    var name = req.body.name;
    var passwd = req.body.passwd;
    var data;
    //是否已注册
    user.select(name).then(function(res){
        if(res.length != 0){
            if(passwd == res[0].passwd){
                req.session.user = name;
                data={
                    "code":0,
                    "msg":"登陆成功"
                }
            }else{
                data={
                    "code":-1,
                    "msg":"用户名密码错误"
                }
            }
        }else{
            data={
                "code":-2,
                "msg":"用户未注册"
            }
        }
        
    },function(err){
        console.log(err);
    }).then(function(){
        res.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
        res.end(JSON.stringify(data));
    });
});

router.post('/loginout',function(req,res){
    res.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
    delete req.session.user;
    var data={
        "code":0,
        "msg":"退出登陆"
    } 
    res.end(JSON.stringify(data));
})
module.exports = router;