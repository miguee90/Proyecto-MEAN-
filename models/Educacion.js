var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var LoginSchema=new mongoose.Schema({
	username:{
		type: String,
		unique:true,
		required: 'Se necesita el nombre de usuario',
		trim:true
	},
	password:{
		type:String,
		validate:[
			function(password){
				return password && password.length>6;
			},'La contraseña tiene que ser mayor'
		]
	}
});

mongoose.model('Login',LoginSchema);