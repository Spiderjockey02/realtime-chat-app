const express = require('express'),
	{ client } = require('../../database'),
	{ fetchChannel, deleteChannel } = require('../../database/channel'),
	{ fetchMessages, fetchMessage, createMessage } = require('../../database/message'),
	router = express.Router();

module.exports = (io) => {
	router
	// Get the channel
		.get('/:channelId', async (req, res) => {
			try {
				const channel = await fetchChannel(client, { id: req.params.channelId });
				res.json(channel ?? { error: 'Incorrect channel Id' });
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured fetching channel' });
			}
		})
	// Update channel (e.g name, etc)
		.patch('/:channelId', async (req, res) => {

		})
	// Delete a channel
		.delete('/:channelId', async (req, res) => {
			try {
				const channel = await deleteChannel(client, { id: req.params.channelId });
				res.json(channel ?? { error: 'Incorrect channel Id' });
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured fetching channel' });
			}
		})
	// Get the latest 100 messages from the channel
		.get('/:channelId/messages', async (req, res) => {
			// Fetch messages
			const messages = await fetchMessages(client, { id: req.params.channelId });
			res.send(messages);
		})
	// Get a specific message from the channel
		.get('/:channelId/messages/:messageId', async (req, res) => {
			const messages = await fetchMessage(client, { id: req.params.messageId });
			res.send(messages);
		})
	// Create a message
		.post('/:channelId/messages', async (req, res) => {
			// Post messages
			try {
				const { id } = await createMessage(client, {
					text: req.body.message,
					userId: req.user.id,
					channelId: req.params.channelId,
				});
				const message = await fetchMessage(client, { id });
				io.to(`channel_${req.params.channelId}`).emit('message', message);
				res.sendStatus(200);
			} catch (err) {
				console.log(err);
				res.sendStatus(500);
			}
		})
	// Update a message
		.patch('/:channelId/messages/:messageId', async (req, res) => {

		})
	// Delete a message
		.delete('/:channelId/messages/:messageId', async (req, res) => {

		});

	return router;
};
