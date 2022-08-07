import express from 'express';
import { findUser, createUser } from '../database/user';
import bcrypt from 'bcrypt';
const	router = express.Router();

router
	.post('/login', async (req, res) => {
		console.log(req.body);
		const { password, code, email } = req.body;
		try {
			const user = await findUser({ email });
			if (!user) return res.json({ error: 'Missing user' });
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				res.json({ success: 'User successfully logged in', code, user });
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
	});


export default router;
