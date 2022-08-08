import client from './index';

type fetchMessages = {
	id: string
}

export async function fetchMessages(data: fetchMessages) {
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
export async function fetchMessage({ id }: fetchMessage) {
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

export async function createMessage(data: createMessage) {
	return client.message.create({
		data: {
			text: data.text,
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
