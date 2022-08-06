import express, { Express } from 'express';
import bodyParser from 'body-parser';
const app: Express = express(),
	http = new (await import('http')).Server(app);
import compression from 'compression';
import session from 'express-session';
import MemoryStore from 'memorystore';
const mStore = MemoryStore(session);
import Logger from './utils/logger';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
const io = new Server(http);
import routes from './routes';


const logger = new Logger();

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
	.use(express.static('./src/public'))
	.use(compression())
	.use(sessionMiddleware)
	.set('view engine', 'ejs')
	.set('views', './src/views')
	.use((req, res, next) => {
		if (req.originalUrl !== '/favicon.ico') logger.connection(req, res);
		next();
	})
	.use('/api', routes(io));

io
	.use((socket, next) => {
		// Wrap the express middleware
		// sessionMiddleware(socket.request, {}, next);
	})
	.on('connection', async (socket) => {
		/*
		// If user isn't logged in then disconnect from socket
		if (socket.request.session.passport == null) return await socket.disconnect();
		const user = new User(socket.request.session.passport.user);

		logger.log(`User logged in to WS: ${user.tag}`);

		// Show ping for client
		socket.on('ping', (callback) => {
			callback();
		});
		socket.on('hello', ({ roomName }) => {
			socket.join(roomName);
		});

		socket.on('disconnect', function() {
			logger.log(`User disconnected from WS: ${user.tag}`);
		});
		*/
	});

http.listen(process.env.port, () => {
	logger.ready(`server is running on port: ${process.env.port}`);
});
