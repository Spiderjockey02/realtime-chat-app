const express = require('express'),
	{ client } = require('../../database'),
	{ createServer, fetchServer, updateServer } = require('../../database/server'),
	router = express.Router();

router
	.post('/', async (req, res) => {
		try {
			await createServer(client, {
				name: req.body.server_name,
				userId: req.user.id,
			});
			res.redirect('/app');
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when creating new server' });
		}
	})
	.get('/:id', async (req, res) => {
		try {
			await fetchServer(client, {});
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when fetching server' });
		}
	})
	.patch('/:id', async (req, res) => {
		try {
			await updateServer(client, {});
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when updating server' });
		}
	});


export default router;
