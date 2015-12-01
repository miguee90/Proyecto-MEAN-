var express = require('express');
var router = express.Router();
var passport=require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose=require('mongoose');
var Login=mongoose.model('Login');

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

module.exports = router;
