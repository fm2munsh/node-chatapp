var db = require('./mongo').db;
var mongoose = require('./mongo').mongoose;

var userSchema = new mongoose.Schema({
	name:{
		type: String,
		unique: true
	} 
});

var User = db.model('User', userSchema);

exports.user = User;