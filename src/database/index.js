const mongoose = require('mongoose'),
	{ mongoDBURL } = require('../config');

module.exports = {
	init: () => {
		const dbOptions = {
			useNewUrlParser: true,
			autoIndex: false,
			connectTimeoutMS: 10000,
			family: 4,
			useUnifiedTopology: true,
		};
		mongoose.connect(mongoDBURL, dbOptions);
		mongoose.Promise = global.Promise;
		mongoose.connection.on('connected', () => {
			console.log('MongoDB successfully connected');
		});
		mongoose.connection.on('err', (err) => {
			console.log(`MongoDB has encountered an error: \n ${err.stack}`);
		});
		mongoose.connection.on('disconnected', () => {
			console.log('MongoDB disconnected');
		});
	},
	async ping() {
		const currentNano = process.hrtime();
		await mongoose.connection.db.command({ ping: 1 });
		const time = process.hrtime(currentNano);
		return (time[0] * 1e9 + time[1]) * 1e-6;
	},
};
