import { fetchChannels } from '../../../database/channel';
import client from '../../../database';


export default async function handler(req, res) {
	const { guildId } = req.query;

	switch (req.method) {
		case 'GET':
			try {
				const channel = await fetchChannels(client, { id: guildId });
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
				const channel = await deleteChannel(client, { id: req.params.channelId });
				res.json(channel ?? { error: 'Incorrect channel Id' });
			} catch (err) {
				console.log(err);
				res.json({ error: 'An error occured fetching channel' });
			}
			break;
		default:
			res.json({ error: 'Incorrect path' });
	}
}
