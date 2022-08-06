import { PrismaClient } from '@prisma/client';

type createUser = {
	email: string
	name: string
	password: string
}

// Create a user
export function createUser(client: PrismaClient, data: createUser) {
	return client.user.create({
		data: {
			email: data.email,
			username: data.name,
			password: data.password,
		},
	});
}

type findUser = {
	email: string
}

// Find a user by email (for login)
export function	findUser(client: PrismaClient, data: findUser) {
	if (data.email) {
		return client.user.findUnique({
			where: {
				email: data.email,
			},
			include: {
				servers: true,
			},
		});
	}

	return null;
}

type updateUser = {
	id: string
	username: string
}

// Update a user (Username, avatar)
export function	updateUser(client: PrismaClient, data: updateUser) {
	return client.user.update({
		where: {
			id: data.id,
		},
		data: {
			username: data.username,
		},
	});
}
