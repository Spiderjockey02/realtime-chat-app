class Server {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.ownerId = data.ownerId;
		this.createdTimestamp = data.createdAt;
	}

	get createdAt() {
		return new Date(this.createdTimestamp);
	}

	get nameAcronym() {
		return this.name
			.replace(/'s /g, ' ')
			.replace(/\w+/g, e => e[0])
			.replace(/\s/g, '');
	}
}

module.exports = Server;
