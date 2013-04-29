var express = require('express')
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

//DB
var User = require('./mongo').user;
var db = require('./mongo').db;

//Clear Database
user = User.find();
user.remove();

//App config
app.configure(function(){
	app.set('view engine', 'ejs'); 
	app.use(express.static(__dirname + '/public'));
});

//Routes
require('./routes')(app, db, User);

//Socket io
require('./socket')(app, db, User, io);

server.listen(8080);