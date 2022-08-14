import client from './index';
import Snowflake from '../utils/Snowflake';

type createUser = {
	email: string
	username: string
	password: string
}

// Create a user
export function createUser(data: createUser) {
	return client.user.create({
		data: {
			id: String(Snowflake.generate()),
			email: data.email,
			username: data.username,
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
		});
	} else if (data.id) {
		return client.user.findUnique({
			where: {
				id: data.id,
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
