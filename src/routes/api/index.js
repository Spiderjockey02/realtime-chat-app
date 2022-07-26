const express = require('express'),
	router = express.Router();


router
	.use('/users', require('./users'))
	.use('/user', require('../user'))
	.use('/guilds', require('./guilds'))
	.get('*', (req, res) => res.json({ error: 'Incorrect path' }));

module.exports = router;
