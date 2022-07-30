import { PrismaClient } from '@prisma/client';

type fetchMessages = {
	id: string
}

export async function fetchMessages(client: PrismaClient, data: fetchMessages) {
	return client.message.findMany({
		where: {
			channelId: data.id,
		},
		include: {
			author: true,
		},
	});
}

type fetchMessage = {
	id: string
}
export async function fetchMessage(client: PrismaClient, { id }: fetchMessage) {
	return client.message.findUnique({
		where: {
			id,
		},
		include: {
			author: true,
		},
	});
}

type createMessage = {
		text: string
		userId: string
		channelId: string
}

export async function createMessage(client: PrismaClient, data: createMessage) {
	return client.message.create({
		data: {
			text: data.text,
			attachment: '',
			author: {
				connect: {
					id: data.userId,
				},
			},
			channel: {
				connect: {
					id: data.channelId,
				},
			},
		},
	});
}
