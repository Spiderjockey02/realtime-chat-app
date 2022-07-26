module.exports = {
	fetchMessages: function(client) {
		return client.message.findMany({
			include: {
				author: true,
			},
		});
	},
	fetchMessage: function(client, { id }) {
		return client.message.findUnique({
			where: {
				id,
			},
			include: {
				author: true,
			},
		});
	},
	createMessage: function(client, data) {
		return client.message.create({
			data: {
				text: data.text,
				attachment: '',
				author: {
					connect: {
						id: data.userId,
					},
				},
			},
		});
	},
};
