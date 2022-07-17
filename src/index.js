const express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	http = require('http').Server(app),
	{ port } = require('./config'),
	fs = require('fs'),
	siofu = require("socketio-file-upload"),
	io = require('socket.io')(http);

// connect to database
require('./database').init();


app.use(express.static(__dirname))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.engine('html', require('ejs').renderFile)
	.use(siofu.router)
	.set('view engine', 'ejs')
	.set('views', './src/views')
	.use('/', require('./routes'))
	.use('/api', require('./routes/api')(io));


io.on('connection', (socket) => {
	console.log('a user is connected');
	var uploader = new siofu();
  uploader.dir = __dirname + '/uploads';
  uploader.listen(socket);
});

http.listen(port, () => {
	console.log('server is running on port', port);
});
