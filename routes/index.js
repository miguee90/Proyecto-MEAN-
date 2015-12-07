var express = require('express');
var router = express.Router();
var passport=require('passport');
var io=require('socket.io');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Login=mongoose.model('Login');
var Alumno=mongoose.model('Alumno');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.post('/login', function(req,res,err){
	var body = req.body;
	var usuario=Login.findOne(body,function(err, user){
        if(err){return next(err)}
        res.json(user);
    });
});

//GET - Listar tareas
router.get('/info', function(req, res, next){
	var socketio = req.app.get('socketio');
	/*
	io.on('connection', function(socket){
		console.log('a user is connected');
	});*/
    Alumno.find(function(err, alumnos){
        if(err){console.log(err);}

        res.json(alumnos);
    })
})

router.post('/info', function(req,res,err){
	var alum=req.body;
	var userna=alum.nombre.split(" ",1);
	var obj={username:userna[0],password:"123456a"};
	var log=new Login(obj);
	
	log.save(function(err,us){
		if(err){console.log(err);}
		
		var quer=req.body;
		quer.usuario_id=us._id;
		
		var alumno=Alumno(quer);
		
		alumno.save(function (err, alumn) {
			if(err){return next(err)}
			res.json(alumn);
		});
		
		//res.json(us);
	});
});

module.exports = router;
