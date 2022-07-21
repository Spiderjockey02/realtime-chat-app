const express = require('express'),
	router = express.Router();


module.exports = () => {
	router
		.use('/user', require('./user'))
		.get('/messages', async (req, res) => {
			res.send('hello');
		});

	return router;
};
