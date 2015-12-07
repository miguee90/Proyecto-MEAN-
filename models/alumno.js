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
	usuario_id:{
		type: Schema.ObjectId,
	}
});

mongoose.model('Alumno',AlumnoSchema);