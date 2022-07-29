export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			try {
				const channel = await fetchChannel(client, { id: req.params.channelId });
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

	}

	const { pid } = req.query;
	res.end(`Post: ${pid}`);
}
