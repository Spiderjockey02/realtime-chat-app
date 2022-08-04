import client from './index';
import { createChannel, getNextPosition } from './channel';

type createServer = {
	name: string
	userId: string
}
// Create a server with 1 text, 1 voice and 2 category channels
export async function createServer(data: createServer) {
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
	await createChannel({ name: 'TEXT CHANNELS', type: 'CATEGORY', serverId: server.id,
		position: await getNextPosition({ serverId: server.id }) });
	await createChannel({ name: 'general', type: 'TEXT', serverId: server.id,
		position: await getNextPosition({ serverId: server.id }) });
	await createChannel({ name: 'VOICE CHANNELS', type: 'CATEGORY', serverId: server.id,
		position: await getNextPosition({ serverId: server.id }) });
	await createChannel({ name: 'General', type: 'VOICE', serverId: server.id,
		position: await getNextPosition({ serverId: server.id }) });
}

type fetchGuilds = {
	userId: string
}

// Fetch all guilds with the same owner
export async function fetchGuilds(data: fetchGuilds) {
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
export async function fetchGuild(data: fetchGuild) {
	return client.server.findUnique({
		where: {
			id: data.id,
		},
		include: {
			users: true,
			roles: true,
		},
	});
}

type deleteGuild = {
	id: string
}

export async function deleteGuild(data: deleteGuild) {
	return client.channel.delete({
		where: {
			id: data.id,
		},
	});
}
