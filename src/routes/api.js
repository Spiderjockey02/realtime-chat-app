const express = require('express'),
	{ UserSchema, StatSchema, FeedbackSchema } = require('../../models'),
	{ checkDev } = require('../config/auth'),
	{ readdirSync } = require('fs'),
	location = process.cwd() + '/src/website/files/userContent/',
	{ post } = require('axios'),
	{ dirTree } = require('../../utils'),
	{ cloudflare } = require('../../config'),
	checkDiskSpace = require('check-disk-space').default,
	router = express.Router();

router.get('/', checkDev, async (req, res) => {
	
});


module.exports = router
