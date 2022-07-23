const express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	http = require('http').Server(app),
	{ port } = require('./config'),
	compression = require('compression'),
	session = require('express-session'),
	MemoryStore = require('memorystore'),
	passport = require('passport'),
	flash = require('connect-flash'),
	mStore = MemoryStore(session),
	{ logger } = require('./utils'),
	io = require('socket.io')(http);

// Configure passport settings
require('./utils/passport')(passport);

// Session handler
const sessionMiddleware = session({
	store:  new mStore({ checkPeriod: 86400000 }),
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
});

// The server
app.use(express.static(__dirname))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.engine('html', require('ejs').renderFile)
	.use(express.static('./src/public'))
	.use(compression())
	.use(sessionMiddleware)
	.use(passport.initialize())
	.use(passport.session())
	.use(flash())
	.set('view engine', 'ejs')
	.set('views', './src/views')
	.use((req, res, next) => {
		if (req.originalUrl !== '/favicon.ico') logger.connection(req, res);
		next();
	})
	.use('/', require('./routes'))
	.use('/api', require('./routes/api')(io));


io
	.use((socket, next) => {
		// Wrap the express middleware
		sessionMiddleware(socket.request, {}, next);
	})
	.on('connection', async (socket) => {
		// If user isn't logged in then disconnect from socket
		if (socket.request.session.passport == null) return await socket.disconnect();
		console.log('a user is connected');

		// Show ping for client
		socket.on('ping', (callback) => {
			callback();
		});
	});

http.listen(port, () => {
	console.log('server is running on port', port);
});
