var express     = require('express');
var app         = express();
var server      = require('http').createServer(app);
var io          = require('socket.io')(server);

app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// routing
app.get('/', function (req, res) {
  // Authentication
  
  res.sendfile(__dirname + '/public/client.html');
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];

io.sockets.on('connection', function (socket) {
	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(data){
        console.log('User : ' + data.username + ' connects to room ' + data.channel);
		// store the username in the socket session for this client
		socket.username = data.username;
		// store the room name in the socket session for this client
		socket.room = data.channel;
		// add the client's username to the global list
		usernames[data.username] = data.username;
		// send client to room 1
		socket.join(data.channel);
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to ' + data.channel);
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to(data.channel).emit('updatechat', 'SERVER', data.username + ' has connected to this room');
		socket.emit('updaterooms', rooms, data.channel);
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
        console.log(socket.username + ' is sending a message.');
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});

server.listen(app.get('port'), function(){
    console.log('Application is listening'); 
});
