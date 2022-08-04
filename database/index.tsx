import { PrismaClient } from '@prisma/client';

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

export default client;
