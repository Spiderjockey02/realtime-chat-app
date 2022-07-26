const express = require('express'),
	{ fetchGuild, fetchGuilds } = require('../database/server'),
	{ fetchChannels } = require('../database/channel'),
	{ client } = require('../database'),
	{ Server } = require('../classes'),
	router = express.Router();


router
	.get('/@me/:userId', (req, res) => {
		// Show DM's with user
	})
	.get('/:guildID/:channelId?', async (req, res) => {
		if (!req.isAuthenticated()) return res.redirect('/login');

		const server = await fetchGuild(client, { id: req.params.guildID });
		if (!server) return res.redirect('/app');

		const guilds = await fetchGuilds(client, { userId: req.user.id }).then(g => g.map(guild => new Server(guild)));
		const channels = await fetchChannels(client, { serverId: server.id });
		const channel = channels.find(c => c.id == req.params.channelId) ?? channels.sort((a, b) => a.position - b.position)[0];

		res.render('TextChannel', {
			user: req.user,
			guilds, channels, channel,
		});
	})
	.get('*', (req, res) => res.redirect('/app'));


module.exports = router;
