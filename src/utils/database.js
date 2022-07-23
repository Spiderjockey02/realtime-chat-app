const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient({ errorFormat: 'pretty',
	log: [
		{ level: 'info', emit: 'event' },
		{ level: 'warn', emit: 'event' },
		{ level: 'error', emit: 'event' },
	] });

client.$use(async (params, next) => {
	const startTime = Date.now();
	const result = await next(params);
	const timeTook = Date.now() - startTime;

	console.log(`Query ${params.model}.${params.action} took ${timeTook}ms`);

	return result;
});

client.$on('info', (data) => {
	console.log(data.message);
});

client.$on('warn', (data) => {
	console.log(data.message);
});

client.$on('error', (data) => {
	console.log(data.message);
});

module.exports = {
	createUser: function(data) {
		return client.user.create({
			data: {
				email: data.email,
				username: data.name,
				password: data.password,
			},
		});
	},
	findUser: function(data) {
		if (data.email) {
			return client.user.findUnique({ where: { email: data.email } });
		}
		return null;
	},
	fetchMessages: function() {
		return client.message.findMany({
			include: {
				author: true,
			},
		});
	},
	fetchMessage: function({ id }) {
		return client.message.findUnique({
			where: {
				id,
			},
			include: {
				author: true,
			},
		});
	},
	createMessage: function(data) {
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
