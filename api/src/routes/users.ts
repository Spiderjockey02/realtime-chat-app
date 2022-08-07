import express from 'express';
import { findUser } from '../database/user';
const	router = express.Router();

router
	.get('/:id', async (req, res) => {
		try {
			const user = await findUser({ id: req.params.id });
			res.json(user ?? { error: 'Missing user' });
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when fetching server' });
		}
	});


export default router;
