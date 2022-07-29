const { createChannel, getNextPosition } = require('./channel');

module.exports = {
	createServer: async function(client, data) {
		// Create server and then 4 channels (2 categories, 1 text channel & 1 voice channel)
		const server = await client.server.create({
			data: {
				name: data.name,
				owner: {
					connect: {
						id: data.userId,
					},
				},
			},
		});
		console.log(server);

		await createChannel(client, { name: 'TEXT CHANNELS', type: 'CATEGORY', serverId: server.id,
			position: await getNextPosition(client, { serverId: server.id }) });
		await createChannel(client, { name: 'general', type: 'TEXT', serverId: server.id,
			position: await getNextPosition(client, { serverId: server.id }) });
		await createChannel(client, { name: 'VOICE CHANNELS', type: 'CATEGORY', serverId: server.id,
			position: await getNextPosition(client, { serverId: server.id }) });
		await createChannel(client, { name: 'General', type: 'VOICE', serverId: server.id,
			position: await getNextPosition(client, { serverId: server.id }) });
	},
	fetchGuilds: function(client, data) {
		return client.server.findMany({
			where: {
				ownerId: data.userId,
			},
		});
	},
	fetchGuild: function(client, data) {
		return client.server.findUnique({
			where: {
				id: data.id,
			},
		});
	},
};
