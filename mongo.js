var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'node-chatapp');

db.on('error', function(err){
  console.log('MongoDB connection error:', err);
});

db.once('open', function () {
	  console.log("Open Mongo Connection");
});

exports.mongoose = mongoose;
exports.db = db;