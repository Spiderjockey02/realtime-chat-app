import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchGuild, deleteGuild } from '../../../database/server';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { guildId } = req.query;
	if (!guildId) return res.json({ error: 'Invalid path' });

	// Fetching, deleting and creating the server
	if (guildId && guildId.length < 2) {
		const id = guildId[0];
		switch (req.method) {
			case 'GET':
				try {
					const server = await fetchGuild({ id });
					res.json(server);
				} catch (err) {
					console.log(err);
					res.json({ error: 'An error occured fetching channel' });
				}
				break;
			case 'PATCH':
				break;
			case 'DELETE':
				try {
					const channel = await deleteGuild({ id });
					res.json(channel ?? { error: 'Incorrect channel Id' });
				} catch (err) {
					console.log(err);
					res.json({ error: 'An error occured fetching channel' });
				}
				break;
			default:
				res.json({ error: 'Incorrect path' });
		}
	} else {
		// For guild properties like roles, channels, emojis
		switch (guildId[1]) {
			case 'channels':
				break;
			default:
				res.json({ error: 'Incorrect path' });
		}
		console.log('boo');
	}
}
