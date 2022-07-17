const { Schema, model } = require('mongoose');

const messageSchema = Schema({
	name: String,
	message: String,
	type: { default: 'message' },
	imageURL: String
});

module.exports = model('Message', messageSchema);
