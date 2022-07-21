const express = require('express'),
	passport = require('passport'),
	bcrypt = require('bcrypt'),
	{ findUser, createUser } = require('../../utils/database'),
	router = express.Router();


router.post('/login', (req, res, next) => {
	passport.authenticate('local', function(err, user, info) {
		// an error occured / unsuccessful log in
		if (!user) {
			req.flash('error', info.message);
			req.flash('userID', info.ID);
			return res.redirect('/login');
		}

		// User logged in
		req.logIn(user, function(err) {
			if (err) return next(err);
			console.log(`User logged in: ${user.email ?? user.name}`);
			return res.redirect('/app');
		});
	})(req, res, next);
});

// User is creating a new account
router.post('/register', async (req, res) => {
	let error;
	console.log(req.body);
	const { name, email, password, password2 } = req.body;

	// Check all fields were filled in
	if (!name || !email || !password || !password2) error = 'Please fill in all fields!';

	// check if passwords match
	if (password !== password2) error = 'Passwords dont match!';


	// check if password is more than 6 characters
	if (password.length < 6) error = 'Password must be atleast 6 characters long!';

	// save name and email in session in case of error
	req.flash('name', name);
	req.flash('email', email);

	// If an error was found notify user
	if (error) {
		req.flash('error', error);
		return res.redirect('/register');
	}

	// Check if user already exists
	const user = await findUser({ email: email });
	if (user) {
		req.flash('error', 'Email is already registered!');
		return res.redirect('/register');
	}

	// Encrypt password (Dont save raw password to database)
	let Hashpassword;
	try {
		const salt = await bcrypt.genSalt(10);
		Hashpassword = await bcrypt.hash(password, salt);
	} catch (err) {
		req.flash('error', 'Failed to encrypt password');
		res.redirect('/register');
		return console.log(err);
	}

	// Save the new user to database + make sure to create folder
	try {
		await createUser({
			name : name,
			email : email,
			password : Hashpassword,
		});
		console.log(`New user: ${email}`);
		res.redirect('/');
	} catch (err) {
		console.log(err);
		req.flash('error', 'An error has occured');
		res.redirect('/login');
	}
});

// logout
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
