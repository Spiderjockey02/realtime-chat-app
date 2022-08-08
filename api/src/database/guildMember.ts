import client from './index';

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
