const express = require('express'),
	{ MessageSchema } = require('../database/models'),
	router = express.Router();


module.exports = (io) => {
	router.get('/messages', async (req, res) => {
		MessageSchema.find({}, (err, messages)=> {
			res.send(messages);
		});
	});

	router.get('/messages/:user', (req, res) => {
		const user = req.params.user;
		MessageSchema.find({ name: user }, (err, messages) => {
			res.send(messages);
		});
	});


	router.post('/messages', async (req, res) => {
		try{
			const message = new MessageSchema(req.body);

			await message.save();
			console.log('saved');

			io.emit('message', req.body);
			res.sendStatus(200);
		} catch (error) {
			res.sendStatus(500);
			return console.log('error', error);
		} finally {
			console.log('Message Posted');
		}
	});

	return router;
};
