const express = require('express'),
	{ fetchMessages, createMessage, fetchMessage } = require('../utils/database'),
	router = express.Router();


module.exports = (io) => {
	router
		.use('/user', require('./user'))
		.get('/messages', async (req, res) => {
			// Fetch messages
			const messages = await fetchMessages();
			res.send(messages);
		})
		.post('/messages', async (req, res) => {
			// Post messages
			try {
				const { id } = await createMessage({
					text: req.body.message,
					userId: req.user.id,
				});
				const message = await fetchMessage({ id });
				console.log(message);
				io.emit('message', message);
				res.sendStatus(200);
			} catch (err) {
				console.log(err);
				res.sendStatus(500);
			}
		});

	return router;
};
