var express = require('express')
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

//App config
app.configure(function(){
	app.set('view engine', 'ejs'); 
	app.use(express.static(__dirname + '/public'));
});

//Routes
app.get('/', function(req, res){ 
	res.render("index.ejs", {layout:false});
});

var message_array = [];
var updateMessages = function (name, data){
	message_array.push({name: name, data: data})

	if (message_array.length > 10) {
		message_array.shift();
	}
}

//Socket
io.sockets.on('connection', function(client){
	console.log('Cient connected ...')
	
	client.on('join', function(name){
		client.set('name', name);
		message_array.forEach(function(message){
			client.emit('chat', message.name + ': ' + message.data);
		});
	});

	client.on('messages', function(data){
		console.log(data);

		var user_name = '';

		client.get('name', function(e , name){
			console.log(name);
			user_name = name;
		});

		updateMessages(user_name, data);

		client.emit('chat', user_name + ': ' + data);
		client.broadcast.emit('chat', user_name + ': ' + data);

	});

});

server.listen(8080);