import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchChannel, deleteChannel } from '../../../database/channel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const channelId = req.query.channelId;
	if(typeof channelId !== 'string') return res.json({ error: 'ChannelId must be type string' });

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
