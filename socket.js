var User = require('./models').user;

var message_array = [];

var updateMessages = function (name, data) {
	message_array.push({ name: name, data: data })

	if (message_array.length > 10) {
		message_array.shift();
	}
}

var updateUsers = function (name) {
	var user = new User( {'name':name} );
	user.save(function(err) { if (err) throw err; });
}

var removeUser = function (name) {
	var user = User.find({'name':name}, function (err) { if (err) throw err; });
	user.remove();
}

exports.io = function(client) {

	console.log('Cient connected ...');
		

	// When a user joins 
	client.on('join', function(name){
			client.set('name', name);

			updateUsers(name);
			
			User.find(function (err, user) {
				if (err) throw err;
				else {

					user.forEach(function(user){
						client.emit('userIn', user.name);
					});
					client.emit('userIn', name);
					client.broadcast.emit('userIn', name);
				}

				message_array.forEach(function(message){
					client.emit('chat', message.name + ': ' + message.data);			
				});
			});

	});
	// End join

	// When a message is sent 
	client.on('messages', function(message){

		client.get('name', function(e , name){
			if (e) throw e;
			user_name = name;
			updateMessages(name, message);

			client.emit('chat', name + ': ' + message);
			client.broadcast.emit('chat', name + ': ' + message);

		});

		
	});
	// End message

	// When a user leaves 
	client.on('disconnect', function(data){

		client.get('name', function(e, name){
			removeUser(name);
			
			
			client.broadcast.emit('userLeft');


			User.find(function (err, user) {
				if (err) throw err;
				else {

					user.forEach(function(user){
						client.broadcast.emit('userIn', user.name);
					});
				}

			});

		});

	});
	// End disconnect

}