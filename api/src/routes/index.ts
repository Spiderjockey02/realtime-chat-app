import express from 'express';
const	router = express.Router();
import type { Server } from 'socket.io';

import channels from './channels';
import guilds from './guilds';
import users from './users';


function route(io: Server) {
	router
		.use('/guilds', guilds)
		.use('/channels', channels(io))
		.use('/users', users);

	return router;
}

export default route;
