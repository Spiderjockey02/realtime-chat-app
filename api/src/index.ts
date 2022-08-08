import 'dotenv/config';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import compression from 'compression';
import session from 'express-session';
import MemoryStore from 'memorystore';
import { Server } from 'socket.io';
import route from './routes';

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

// Session handler
const Store = MemoryStore(session);
const sessionMiddleware = session({
	store:  new Store({ checkPeriod: 86400000 }),
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

	io.on("connection", (s) => {
		console.log(s)
	})

server.listen(process.env.port, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${ process.env.port }`);
});
