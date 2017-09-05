/*
	path provides better way to handle relative paths
*/
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

const publicPath = path.join(__dirname, "/../public");
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log("New user connected");

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
