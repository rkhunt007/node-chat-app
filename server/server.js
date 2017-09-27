/*
	path provides better way to handle relative paths
*/
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

const { generateMessage, generateLocationMessage } = require('./utils/message')
const publicPath = path.join(__dirname, "/../public");
const PORT = process.env.PORT || 3001;

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.emit("newMessage", generateMessage('Admin', 'Welcome to chat app'));

	socket.broadcast.emit("newMessage", generateMessage('Admin', 'New user joined'));

	socket.on('disconnect', () => {
		console.log("User disconnected");
	})

	socket.on('createMessage', (message, callback) => {
		console.log("createMessage", message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	})

	socket.on("createLocationMessage", (coords) =>{
		io.emit('newLocationMessage', generateLocationMessage("User", coords.latitude, coords.longitude));
	})
})

server.listen(PORT, function() {
	console.log("Running app on port", PORT);
})
