var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var CaliSchema=new mongoose.Schema({
	calificacion:{
		type:Number
	},
	parcial:{
		type: Number
	},
	grupo:{
		type: Schema.ObjectId,
		ref: 'Grupo'
	}
});

mongoose.model('Cali',CaliSchema);