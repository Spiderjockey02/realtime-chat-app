const express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	http = require('http').Server(app),
	{ port } = require('./config'),
	io = require('socket.io')(http);

// connect to database
require('./database').init();


app.use(express.static(__dirname))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.engine('html', require('ejs').renderFile)
	.set('view engine', 'ejs')
	.set('views', './src/views')
	.use('/', require('./routes'))
	.use('/api', require('./routes/api')(io));


io.on('connection', () => {
	console.log('a user is connected');
});

http.listen(port, () => {
	console.log('server is running on port', port);
});
