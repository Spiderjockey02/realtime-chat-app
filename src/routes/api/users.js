const express = require('express'),
	{ client } = require('../../database'),
	{ findUser, updateUser } = require('../../database/user'),
	{ fetchGuilds, leaveGuild } = require('../../database/server'),
	router = express.Router();

router
	// Return the User data
	.get('/@me', async (req, res) => {
		const user = await findUser(client, { id: req.user.id });
		res.json(user ?? { error: 'No user found' });
	})
	// Return a users data
	.get('/:id', async (req, res) => {
		const user = await findUser(client, { id: req.query.id });
		res.json(user ?? { error: 'No user found' });
	})
	// Update the user's username and/or avatar
	.patch('@me', async (req, res) => {
		const { username, avatar } = req.body;
		if (!username && !avatar) return res.json({ error: 'Nothing to update' });

		const user = await updateUser(client, { id: req.user.id, username, avatar });
		console.log(user);
	})
	// Return a list of the user's guilds
	.get('/@me/guilds', async (req, res) => {
		const guilds = await fetchGuilds(client, { id: req.user.id });
		res.json(guilds);
	})
	// Return a guildMember of the current user
	.get('/@me/guilds/:id/member')
	// Leave the guild as the current user
	.delete('/@me/guilds/:id', async (req, res) => {
		try {
			await leaveGuild(client, { id: req.query.id });
			res.json({ success: 'Successfully left guild' });
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when leaving a guild' });
		}
	})
	// Create a DM with another user
	.post('/@me/channels', async (req, res) => {
		try {
			// Make DM's somehow
			res.json({ success: 'Successfully added users to group DM.' });
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when adding users to group DM.' });
		}
	});

module.exports = router;
