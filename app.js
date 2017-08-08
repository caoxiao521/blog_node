var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStrore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware'); 

var index = require('./router/index');
var login = require('./router/login');
var register = require('./router/register');

var app = express();
var port = 888;
var option={
	"host":"127.0.0.1",
	"port":6379,
	"ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天
}

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({	
	resave: true,
	saveUninitialized: true,
	secret:"blog",
	store:new RedisStrore(option),
}));


//验证是否登录
app.use(function(req,res,next){
	var session = req.session;
	if(!session.user){
		if(req.url == '/login' || req.url == '/register'){
			next();
		}else{
			res.redirect('/login');
		}
	}else{
		next();
	}
});
//路由
app.use('/',index);
app.use('/login',login); 
app.use('/register',register); 
//404
app.use(function(req,res,next){
	var error = new Error('找不到页面');
	error.status = 404;
	next(error)
});

//错误页面路由
app.use(function(error,req,res,next){
	res.status(error.status || 500);
	res.render('error',{
		msg:error.message,
		error: error
	})
});

app.listen(port,function(){
	console.log('start:'+port)
});