var server = io.connect('http://localhost:1337');

  // socket.io stuff
  server.on('messages', function(data) {
    $('#message').val('hi');
    $('#messages').Toggle();
    $('#messages').append(data+'<br>');
  });

  server.on('connect', function(data){
    var name = prompt('Enter your name');
    server.emit('join', name)
  });

  server.on('chat', function(msg){
        var message = document.createElement("li");
        $(message).html(msg);
        $('#messages').append(message);
  });

  server.on('userIn', function(user){
        var userLi = document.createElement("li");
        $(userLi).html(user);
        $('#users').append(userLi);
  });

  server.on('userLeft', function(){
    $('#users').text('');
  });
  // End socket.io