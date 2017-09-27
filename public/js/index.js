var socket = io();

socket.on('connect', function() {
	console.log("Connected to server");
})

socket.on('disconnect', function() {
	console.log("Disconnected from server");
})

socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('hh:mm a'); 
	var template = jQuery("#message-template").html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery("#messages").append(html);
})

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('hh:mm a');
	var template = jQuery("#location-message-template").html();
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery("#messages").append(html);
})

jQuery("#message-form").on('submit', function (e) {
	e.preventDefault();
	var messageTextbox = jQuery('[name=message]');
	socket.emit("createMessage", {
		from: "User",
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val('');
	})
})

var locationButton = jQuery("#send-location");
locationButton.on("click", function (argument) {
	if (!navigator.geolocation) {
		return alert("Geolocation is not available");
	}

	locationButton.attr('disabled', 'disabled').text("Sending location...");
	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text("Send location");
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function () {
		locationButton.removeAttr('disabled').text("Send location");
		alert("Failed to fetch location data");
	})
})