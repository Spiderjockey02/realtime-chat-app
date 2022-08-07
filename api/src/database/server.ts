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

type fetchServers = {
	userId: string
}

// Fetch all guilds with the same owner
export async function fetchServers(data: fetchServers) {
	return client.server.findMany({
		where: {
			ownerId: data.userId,
		},
	});
}

type fetchServer = {
	id: string
}
// Fetch a guild by ID
export async function fetchServer(data: fetchServer) {
	return client.server.findUnique({
		where: {
			id: data.id,
		},
		include: {
			users: true,
			roles: true,
			channels: {
				include: {
					children: true,
				},
			},
		},
	});
}

type deleteServer = {
	id: string
}

export async function deleteServer(data: deleteServer) {
	return client.channel.delete({
		where: {
			id: data.id,
		},
	});
}

type updateServer = {
	id: string
}

export async function updateServer(data:updateServer) {
	return client.channel.delete({
		where: {
			id: data.id,
		},
	});
}
