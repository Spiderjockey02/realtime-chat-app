import { PrismaClient } from '@prisma/client';
import { createChannel, getNextPosition } from './channel';

type createServer = {
	name: string
	userId: string
}
// Create a server with 1 text, 1 voice and 2 category channels
export async function createServer(client: PrismaClient, data: createServer) {
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

	// Create channels
	await createChannel(client, { name: 'TEXT CHANNELS', type: 'CATEGORY', serverId: server.id,
		position: await getNextPosition(client, { serverId: server.id }) });
	await createChannel(client, { name: 'general', type: 'TEXT', serverId: server.id,
		position: await getNextPosition(client, { serverId: server.id }) });
	await createChannel(client, { name: 'VOICE CHANNELS', type: 'CATEGORY', serverId: server.id,
		position: await getNextPosition(client, { serverId: server.id }) });
	await createChannel(client, { name: 'General', type: 'VOICE', serverId: server.id,
		position: await getNextPosition(client, { serverId: server.id }) });
}

type fetchGuilds = {
	userId: string
}

// Fetch all guilds with the same owner
export async function fetchGuilds(client: PrismaClient, data: fetchGuilds) {
	return client.server.findMany({
		where: {
			ownerId: data.userId,
		},
	});
}

type fetchGuild = {
	id: string
}
// Fetch a guild by ID
export async function fetchGuild(client: PrismaClient, data: fetchGuild) {
	return client.server.findUnique({
		where: {
			id: data.id,
		},
	});
}
