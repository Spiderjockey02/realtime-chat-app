import express from 'express';
import { createServer, fetchServer, updateServer } from '../database/server';
const	router = express.Router();

router
	.post('/', async (req, res) => {
		try {
			await createServer({
				name: req.body.server_name,
				userId: '1000',
			});
			res.redirect('/app');
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when creating new server' });
		}
	})
	.get('/:id', async (req, res) => {
		try {
			const server = await fetchServer({ id: req.params.id });
			res.json(server ?? { error: 'no guild' });
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when fetching server' });
		}
	})
	.patch('/:id', async (req, res) => {
		try {
			await updateServer({ id: req.params.id });
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when updating server' });
		}
	});


export default router;
