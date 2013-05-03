var express = require('express')
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

//App config
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view options', { layout:'layout.ejs' }); 
    app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '/public'));
});


//Dependancies
var User = require('./models').user;
var db = require('./mongo').db;
var routes = require('./routes');
var socket = require('./socket');

app.get('/', routes.index);

//Clear Database
user = User.find();
user.remove();

io.on('connection', socket.io);

server.listen(1337);