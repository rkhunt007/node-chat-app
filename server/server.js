/*
	path provides better way to handle relative paths
*/
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

const publicPath = path.join(__dirname, "/../public");
const PORT = process.env.PORT || 3005;

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.emit("newMessage", {
		from: "admin",
		text: "Welcome to chat app",
		createdAt: new Date().getTime()
	})

	socket.broadcast.emit("newMessage", {
		from: "admin",
		text: "new user joined",
		createdAt: new Date().getTime()
	})

	socket.on('disconnect', () => {
		console.log("User disconnected");
	})

	socket.on('createMessage', (message) => {
		console.log("createMessage", message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	})
})

server.listen(PORT, function() {
	console.log("Running app on port", PORT);
})
