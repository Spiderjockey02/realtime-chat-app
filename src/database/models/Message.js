const { Schema, model } = require('mongoose');

const messageSchema = Schema({
	name: String,
	message: String,
});

module.exports = model('Message', messageSchema);
