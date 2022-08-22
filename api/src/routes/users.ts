import express from 'express';
import { findUser, updateUser } from '../database/user';
import { getUserGuilds } from '../database/guildMember';
const	router = express.Router();

import type { Server } from 'socket.io';

export default function(_: Server) {
	router
		.get('/:id', async (req, res) => {
			try {
				const user = await findUser({ id: req.params.id });
				res.json(user ?? { error: 'Missing user' });
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured when fetching user' });
			}
		})
		.patch('/@me', async (req, res) => {
			const { token, username } = req.body;
			try {
				const user = await updateUser({ id: token, username });
				res.json(user);
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured when fetching user' });
			}
		})
		.get('/@me/guilds', async (req, res) => {
			const { token } = req.body;
			const guilds = await getUserGuilds({ id: token });
			res.json(guilds);
		});

	return router;
}
