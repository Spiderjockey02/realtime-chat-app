import client from '../../../database/index';
import { findUser, createUser } from '../../../database/user';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let error;
	const { name, email, password, password2 } = req.body;

	// Check all fields were filled in
	if (!name || !email || !password || !password2) error = 'Please fill in all fields!';

	// check if passwords match
	if (password !== password2) error = 'Passwords dont match!';


	// check if password is more than 6 characters
	if (password.length < 6) error = 'Password must be atleast 6 characters long!';

	// If an error was found notify user
	if (error) {
		return res.redirect('/register');
	}

	// Check if user already exists
	const user = await findUser(client, { email: email });
	if (user) {
		return res.redirect('/register');
	}

	// Encrypt password (Dont save raw password to database)
	let Hashpassword;
	try {
		const salt = await bcrypt.genSalt(10);
		Hashpassword = await bcrypt.hash(password, salt);
	} catch (err) {
		// req.flash('error', 'Failed to encrypt password');
		res.redirect('/register');
		return console.log(err);
	}

	// Save the new user to database + make sure to create folder
	try {
		await createUser(client, {
			name : name,
			email : email,
			password : Hashpassword,
		});
		console.log(`New user: ${email}`);
		res.redirect('/');
	} catch (err) {
		console.log(err);
		res.redirect('/login');
	}

}
