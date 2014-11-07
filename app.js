var express     = require('express');
var app         = express();
var server      = require('http').createServer(app);
var io          = require('socket.io')(server);
var http				= require('http');

app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// routing
app.get('/', function (req, res) {
// Authentication
console.log(res.statusCode);
  res.sendfile(__dirname + '/public/client.html');
});

io.sockets.on('connection', function(socket)
{
				var uservalidated = false;
				socket.on('auth_user', function(ud){
								
								var options = {
																host:'54.255.176.250',
																path:'http://54.255.176.250/authenticate?access='+ud.accesscd+'&user='+ud.userid
															};
								
								http.get(options, function(res){
												res.statusCode;
												res.setEncoding('utf8');
												res.on('data', function(chunk){
													var JSONobj = JSON.parse(chunk);
																if(JSONobj['status'] == 200 && JSONobj['code'] == 'user_authenticated'){
																				uservalidated = true;
																}
												});
								}).on('error', function(e){
									console.log('Got an error : ' + e.message);
								});
								
								console.log('User ' + ud.username + ' joins in channel ' + ud.cid);
								socket.join(ud.cid);
								io.in(ud.cid).emit('allow-chat-input',{allow: uservalidated, cid: ud.cid});
								if (ud.username.indexOf('Guest') < 0) {
												io.in(ud.cid).emit('update-ui', {msgtype: 'notification', user: ud.username, msg: 'You have successfully connected to Channel ' + ud.cid, cid:ud.cid});		
								} else {
												io.in(ud.cid).emit('update-ui', {msgtype: 'notification', user: ud.username, msg: 'Welcome ' + ud.username + ' to Channel ' + ud.cid, cid:ud.cid});
								}
								
								
				});
				
				socket.on('send-gm', function(ud){
								console.log(ud.username + ' is sending a message : [' + ud.msg + '] in channel ' + ud.cid);
								io.in(ud.cid).emit('update-ui', {msgtype: 'chatmessage', user: ud.username, msg: ud.msg, uavatar: ud.uavatar, cid:ud.cid});
				});
				
				socket.on('send-pm', function(ud){
						
				});
				
				socket.on('leave-room', function(ud){
						
				});
				
				socket.on('disconnect', function(ud){
								socket.broadcast.emit('update-ui', 'SERVER', socket.uname + ' leaves the chatroom');
								socket.leave(ud.cid);
				});
				
});

server.listen(app.get('port'), function(){
    console.log('Application is listening'); 
});
