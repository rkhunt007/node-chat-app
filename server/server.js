/*
	path provides better way to handle relative paths
*/
const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, "/../public");
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(PORT, function() {
	console.log("Running app on port", PORT);
})
