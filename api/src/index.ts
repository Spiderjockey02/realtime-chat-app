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
import { logger } from './utils/Logger';
import { Utils } from './utils/Utils';
import { join } from 'path';

const io = new Server(server, {
	cors: {
		origin: process.env.NEXTAUTH_URL,
		methods: ['GET', 'POST'],
		allowedHeaders: ['authorization'],
		credentials: true,
	},
});

// Session handler
const sessionMiddleware = session({
	store:  new mStore({ checkPeriod: 86400000 }),
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
});

(async () => {
	// The API server
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
		.use(sessionMiddleware);
	// Get all routes
	const endpoints = Utils.generateRoutes(join(__dirname, './', 'routes'), 'api');

	for (const endpoint of endpoints) {
		logger(`Loading: ${endpoint.route} endpoint.`, 'log');
		app.use(endpoint.route, (await import(endpoint.path)).default(io));
	}

	// The WS server
	io
		.on('connection', async (socket) => {
			const userToken = socket.handshake.query.token;
			console.log(userToken);
			try {
				const decoded = jwt.verify(userToken as string, 'JHLSDHLFSFDSDIUBFSL UBLSIUF RI7B34L7I46B7IBLI7BBG7OIWBV74IV7BI64VB74647B3VB7346VB4376V4B7W6');
				console.log('de', decoded);
			} catch(err) {
				console.log(err);
				console.log('Someone tried to connect without logging in');
				socket.disconnect();
			}

			// Show ping for client
			socket.on('ping', (callback) => {
				callback();
			});

			socket.on('disconnect', function() {
				console.log('User disconnected from WS');
			});
		});

	// Puts server online
	server.listen(process.env.port, () => {
		logger(`server started at http://localhost:${process.env.port}`, 'ready');
	});

})();
