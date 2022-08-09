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
import cors from 'cors';
dotenv.config({ path: `${process.cwd()}/.env` });
import jwt from 'jsonwebtoken';

const io = new Server(server, {
	cors: {
		origin: process.env.NEXTAUTH_URL,
		methods: ['GET', 'POST'],
		allowedHeaders: ['authorization'],
		credentials: true,
	},
});
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
	.use(cors({
		origin: process.env.NEXTAUTH_URL,
		methods: ['GET', 'POST'],
		credentials: true,
	}))
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
		const userToken = socket.handshake.query.token;
		console.log(userToken);
		try {
			const decoded = jwt.verify(userToken as string, 'JHLSDHLFSFDSDIUBFSL UBLSIUF RI7B34L7I46B7IBLI7BBG7OIWBV74IV7BI64VB74647B3VB7346VB4376V4B7W6');
			console.log('de', decoded);
		} catch(err) {
			console.log('Someone tried to connect without logging in');
			socket.disconnect();
		}
		// Show ping for client
		socket.on('ping', (callback) => {
			console.log('send ping');
			// socket.emit('messages', [{ id: Math.random(), text: 'boo', author: { user: 'ben' } }]);
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
