import express from 'express';
import { findUser, createUser } from '../database/user';
import { getUserGuilds } from '../database/guildMember';
import bcrypt from 'bcrypt';
const	router = express.Router();
import jwt from 'jsonwebtoken';
import type { Server } from 'socket.io';

export default function(_: Server) {
	router
		.post('/login', async (req, res) => {
			const { password, code, email } = req.body;
			try {
				const user = await findUser({ email });
				if (!user) return res.json({ error: 'Missing user' });
				const isMatch = await bcrypt.compare(password, user.password);
				if (isMatch) {
					console.log(user);
					const guilds = await getUserGuilds({ id: user.id });
					console.log(guilds);
					res.json({ success: 'User successfully logged in', code, user: Object.assign(user, { guilds: guilds }, { token: jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1800s' }) }) });
				} else {
					res.json({ error: 'Incorrect password' });
				}
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured when fetching server' });
			}
		})
		.post('/register', async (req, res) => {
			console.log(req.body);
			const { password, username, email } = req.body;

			try {
				const user = await createUser({ email, username, password });
				res.json(user);
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured when fetching server' });
			}
		})
		.post('/check', async (req, res) => {
			const { email } = req.body;

			try {
				const user = await findUser({ email });
				res.json({ found: (user) ? true : false });
			} catch (err: any) {
				console.log(err);
				res.json({ error: err.message });
			}
		});
	return router;
}
