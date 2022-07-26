module.exports = {
	createUser: function(client, data) {
		return client.user.create({
			data: {
				email: data.email,
				username: data.name,
				password: data.password,
			},
		});
	},
	findUser: function(client, data) {
		if (data.email) {
			return client.user.findUnique({ where: { email: data.email } });
		}
		return null;
	},
	updateUser: function(client, data) {
		return client.user.update({
			where: {
				id: data.id,
			},
			data: {
				title: data.title,
				description: data.description,
			},
		});
	},
};
