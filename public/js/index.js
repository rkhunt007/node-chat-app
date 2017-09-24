var socket = io();

socket.on('connect', function() {
	console.log("Connected to server");
})

socket.on('disconnect', function() {
	console.log("Disconnected from server");
})

socket.on('newMessage', function(message) {
	console.log('newMessage', message);
	var li = jQuery("<li></li>");
	li.text(`${message.from}: ${message.text}`);

	jQuery("#messages").append(li);
})

socket.on('newLocationMessage', function(message) {

	var li = jQuery("<li></li>");
	var a = jQuery("<a target='_blank'>My Current Location</a>");
	li.text(`${message.from}: `);
	li.append(a);
	a.attr('href', message.url);
	jQuery("#messages").append(li);
})

jQuery("#message-form").on('submit', function (e) {
	e.preventDefault();

	socket.emit("createMessage", {
		from: "user",
		text: jQuery('[name=message]').val()
	}, function (argument) {
		
	})
})

var locationButton = jQuery("#send-location");
locationButton.on("click", function (argument) {
	if (!navigator.geolocation) {
		return alert("Geolocation is not available");
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function () {
		alert("Failed to fetch location data");
	})
})