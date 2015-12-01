var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var GrupoSchema=new mongoose.Schema({
	horario:{
		type: String,
	},
	alumno:{
		type: Schema.ObjectId,
		ref:'Alumno'
	},
	curso:{
		type: Schema.ObjectId,
		ref: 'Curso'
	}
});

mongoose.model('Grupo',GrupoSchema);