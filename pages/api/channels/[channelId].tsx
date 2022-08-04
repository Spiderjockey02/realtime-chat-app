import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchChannel, deleteChannel } from '../../../database/channel';

export default async function handler(req, res) {
	const channelId = req.query.channelId;


	switch (req.method) {
		case 'GET':
			try {
				const channel = await fetchChannel({ id: channelId });
				res.json(channel ?? { error: 'Incorrect channel Id' });
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured fetching channel' });
			}
			break;
		case 'PATCH':
			break;
		case 'DELETE':
			try {
				const channel = await deleteChannel({ id: channelId });
				res.json(channel ?? { error: 'Incorrect channel Id' });
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured fetching channel' });
			}
			break;
		default:
			break;
	}
}
