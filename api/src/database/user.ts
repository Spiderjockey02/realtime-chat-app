import client from './index';

type createUser = {
	email: string
	name: string
	password: string
}

// Create a user
export function createUser(data: createUser) {
	return client.user.create({
		data: {
			email: data.email,
			username: data.name,
			password: data.password,
		},
	});
}

type findUser = {
	email?: string
	id?: string
}

// Find a user by email (for login)
export function	findUser(data: findUser) {
	if (data.email) {
		return client.user.findUnique({
			where: {
				email: data.email,
			},
			include: {
				servers: true,
			},
		});
	} else if (data.id) {
		return client.user.findUnique({
			where: {
				id: data.id,
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
export function	updateUser(data: updateUser) {
	return client.user.update({
		where: {
			id: data.id,
		},
		data: {
			username: data.username,
		},
	});
}
