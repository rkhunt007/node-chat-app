/*
	path provides better way to handle relative paths
*/
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, "/../public");
const PORT = process.env.PORT || 3001;

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
		}
	})

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);
		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	})

	socket.on("createLocationMessage", (coords) => {
		var user = users.getUser(socket.id);
		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	})

	socket.on("join", (params, callback) =>{
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room is not valid');
		}
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit("newMessage", generateMessage('Admin', 'Welcome to chat app'));
		socket.broadcast.to(params.room).emit("newMessage", generateMessage('Admin', `${params.name} has joined`));
		callback();
	})
})

server.listen(PORT, function() {
	console.log("Running app on port", PORT);
})
