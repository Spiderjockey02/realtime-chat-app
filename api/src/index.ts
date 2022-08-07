import express, { Express } from 'express';
import bodyParser from 'body-parser';
const app: Express = express();
import * as http from 'http';
const server = http.createServer(app);
import compression from 'compression';
import session from 'express-session';
import MemoryStore from 'memorystore';
const mStore = MemoryStore(session);
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
const io = new Server(server);
import route from './routes';


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
	.use('/api', route.route(io));

io
	/*
	.use((socket, next) => {
		// Wrap the express middleware
		// sessionMiddleware(socket.request, {}, next);
	})
	*/
	.on('connection', async (socket) => {
		// Show ping for client
		socket.on('ping', (callback) => {
			callback();
		});
		socket.on('hello', ({ roomName }) => {
			socket.join(roomName);
		});

		socket.on('disconnect', function() {
			console.log('User disconnected from WS');
		});
	});
server.listen(process.env.port, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${ process.env.port }`);
});
