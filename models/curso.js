var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var CursoSchema=new mongoose.Schema({
	materia:{
		type: Schema.ObjectId,
		ref: 'Materia'
	},
	profesor:{
		type: Schema.ObjectId,
		ref: 'Profesor'
	}
});

mongoose.model('Curso',CursoSchema);