var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var AlumnoSchema=new mongoose.Schema({
	nombre:{
		type: String,
	},
	clave:{
		type:Number
	},
	grado:{
		type: Number
	},
	usuario:{
		type: Schema.ObjectId,
		ref: 'Login'
	}
});

mongoose.model('Alumno',AlumnoSchema);