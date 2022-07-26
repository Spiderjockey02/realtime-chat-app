const	{ Strategy } = require('passport-local'),
	{ client } = require('../database'),
	{ findUser } = require('../database/user'),
	{ User } = require('../classes'),
	bcrypt = require('bcrypt');

module.exports = function(passport) {
	// For just general login (username + email + password)
	passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			// Check database for that email
			const user = new User(await findUser(client, { email: email }));
			if (!user) return done(null, false, { message: 'Email not registered!' });
			// Check if the password is correct
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Password incorrect!' });
				}
			});
		} catch (err) {
			console.log(err);
		}
	}));

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});
};
