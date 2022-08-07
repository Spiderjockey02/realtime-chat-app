import express from 'express';
import { findUser } from '../database/user';
import bcrypt from 'bcrypt';
const	router = express.Router();

router
	.get('/', async (req, res) => {
		const { password, code, email } = req.body;
		try {
			const user = await findUser({ email });
			if (!user) return res.json({ error: 'Missing user' });
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				res.json({ success: 'User successfully logged in', code });
			} else {
				res.json({ error: 'Incorrect password' });
			}

			res.json(user ?? { error: 'Missing user' });
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when fetching server' });
		}
	});


export default router;
