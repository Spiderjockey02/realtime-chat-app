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

		// Fetch all user's guilds + the servers channels
		const guilds = await fetchGuilds(client, { userId: req.user.id }).then(g => g.map(guild => new Server(guild)));
		const channels = await fetchChannels(client, { serverId: server.id });

		// If a channelId wasn't specified then choose the first text channel
		// If a channelId was specified make sure it's a text or voice channel (VOICE not implemented)
		let channel = channels.find(c => c.id == req.params.channelId);
		if (!channel || !['TEXT', 'VOICE'].includes(channel.type)) {
			channel = channels.filter(c => c.type == 'TEXT').sort((a, b) => a.position - b.position)[0];
			return res.redirect(`/channel/${server.id}/${channel.id}`);
		}

		// Render the page
		res.render('TextChannel', {
			user: req.user,
			guilds, channels, channel,
		});
	})
	.get('*', (req, res) => res.redirect('/app'));


module.exports = router;
