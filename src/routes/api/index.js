const express = require('express'),
	router = express.Router();

module.exports = (io) => {
	router
		.use('/users', require('./users'))
		.use('/user', require('../user'))
		.use('/guilds', require('./guild'))
		.use('/channels', require('./channel')(io))
		.get('*', (req, res) => res.json({ error: 'Incorrect path' }));

	return router;
};
