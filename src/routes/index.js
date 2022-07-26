const express = require('express'),
	{ client } = require('../database'),
	{ fetchGuilds } = require('../database/server'),
	{ Server } = require('../classes'),
	router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		user: req.isAuthenticated() ? req.user : null,
	});
});

router.get('/app', async (req, res) => {
	if (!req.isAuthenticated()) return res.redirect('/');
	const guilds = await fetchGuilds(client, { userId: req.user.id }).then(g => g.map(guild => new Server(guild)));
	res.render('app', {
		user: req.user,
		guilds,
	});
});

router.get('/login', (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/app');
	res.render('login', {
		error: req.flash('error'),
		name: req.flash('name'),
	});
});

router.get('/register', (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/app');
	res.render('register', {
		error: req.flash('error'),
		name:	req.flash('name'),
		email: req.flash('email'),
	});
});

module.exports = router;
