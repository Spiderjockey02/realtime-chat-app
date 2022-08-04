import client from './index';

type deleteChannel = {
	id: string
}

export async function deleteChannel(data: deleteChannel) {
	return client.channel.delete({
		where: {
			id: data.id,
		},
	});
}

type fetchChannel = {
	id: string
}

export async function fetchChannel(data: fetchChannel) {
	return client.channel.findUnique({
		where: {
			id: data.id,
		},
	});
}

type fetchChannels = {
	serverId: string
}

export async function fetchChannels(data: fetchChannels) {
	return client.channel.findMany({
		where: {
			serverId: data.serverId,
		},
	});
}

type createChannel = {
	name: string
	type?: string
	topic?: string
	position: number
	serverId: string
}

export async function createChannel(data: createChannel) {
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
}

type getNextPosition = {
	serverId: string
}

export async function getNextPosition(data: getNextPosition) {
	const channels = await client.channel.findMany({
		where: {
			serverId: data.serverId,
		},
		orderBy: {
			position: 'asc',
		},
	});
	return channels.length;
}
