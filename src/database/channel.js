module.exports = {
	fetchChannel: function(client, data) {
		return client.channel.findUnique({
			where: {
				id: data.id,
			},
		});
	},
	fetchChannels: function(client, data) {
		return client.channel.findMany({
			where: {
				serverId: data.serverId,
			},
		});
	},
	createChannel: function(client, data) {
		return client.channel.create({
			data: {
				name: data.name,
				type: data.type ?? 'TEXT',
				topic: data.topic ?? '',
				position: data.position,
				server: {
					connect: {
						id: data.serverId,
					},
				},
			},
		});
	},
	getNextPosition: async function(client, data) {
		const channels = await client.channel.findMany({
			where: {
				serverId: data.serverId,
			},
			orderBy: {
				position: 'asc',
			},
		});
		return channels.length;
	},
};
