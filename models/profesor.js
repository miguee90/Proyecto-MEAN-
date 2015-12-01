var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var ProfesorSchema=new mongoose.Schema({
	nombre:{
		type: String,
		required: 'Se necesita el nombre de usuario',
	},
	telefono:{
		type:Number
	},
	direccion:{
		type: String
	},
	usuario:{
		type: Schema.ObjectId,
		ref: 'Login'
	}
});

mongoose.model('Profesor',ProfesorSchema);