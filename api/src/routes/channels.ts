import express from 'express';
import { fetchChannel, deleteChannel } from '../database/channel';
import { fetchMessages, fetchMessage, createMessage } from '../database/message';
import { Server } from 'socket.io';
const	router = express.Router();

export default function(io: Server) {
	router
	// Get the channel
		.get('/:channelId', async (req, res) => {
			try {
				const channel = await fetchChannel({ id: req.params.channelId });
				res.json(channel ?? { error: 'Incorrect channel Id' });
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured fetching channel' });
			}
		})
	// Delete a channel
		.delete('/:channelId', async (req, res) => {
			try {
				const channel = await deleteChannel({ id: req.params.channelId });
				res.json(channel ?? { error: 'Incorrect channel Id' });
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured fetching channel' });
			}
		})
	// Get the latest 100 messages from the channel
		.get('/:channelId/messages', async (req, res) => {
			// Fetch messages
			const messages = await fetchMessages({ id: req.params.channelId });
			res.send(messages);
		})
	// Get a specific message from the channel
		.get('/:channelId/messages/:messageId', async (req, res) => {
			const messages = await fetchMessage({ id: req.params.messageId });
			res.send(messages);
		})
	// Create a message
		.post('/:channelId/messages', async (req, res) => {
			// Post messages
			try {
				const { id } = await createMessage({
					text: req.body.message,
					userId: '1000',
					channelId: req.params.channelId,
				});
				const message = await fetchMessage({ id });
				io.to(`channel_${req.params.channelId}`).emit('message', message);
				res.sendStatus(200);
			} catch (err) {
				console.log(err);
				res.sendStatus(500);
			}
		});

	return router;
}