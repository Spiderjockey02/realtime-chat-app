import client from './index';
import Snowflake from '../utils/Snowflake';

type findUser = {
	id: string
}

// Find a user by email (for login)
export function	getUserGuilds(data: findUser) {
	return client.guildMember.findMany({
		where: {
			userId: data.id,
		},
		include: {
			guild: {
				include: {
					channels: true,
				},
			},
		},
	});
}

type createMember = {
	userId: string
	guildId: string
}
export function createGuildMember({ userId, guildId }: createMember) {
	return client.guildMember.create({
		data: {
			id: String(Snowflake.generate()),
			userId: userId,
			guild: {
				connect: {
					id: guildId,
				},
			},
		},
	});
}
