var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var MateriaSchema=new mongoose.Schema({
	nombre:{
		type: String,
	},
	grado:{
		type:String
	}
});

mongoose.model('Materia',MateriaSchema);