
var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'node-chatapp');

db.on('error', function(err){
  console.log('MongoDB connection error:', err);
});//If there is an error with db

db.once('open', function () {
	  console.log("OPEN MONGO CONNECTION");
});//End db.open

var userSchema = new mongoose.Schema({
	name:{
		type: String,
		unique: true
	} 
});

var User = db.model('User', userSchema);

exports.user = User;
exports.db = db;