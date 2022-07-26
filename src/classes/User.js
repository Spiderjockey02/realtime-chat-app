class User {
	constructor(data) {
		this.id = data.id;
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.avatar = data.avatar;
		this.bot = data.bot;
		this.system = data.system;
		this.email = data.email;
		this.createdTimestamp = data.createdAt;
		this.password = data.password;
	}

	get createdAt() {
		return new Date(this.createdTimestamp);
	}

	avatarURL() {
		return `http://192.168.0.14:3000/${(this.avatar) ? `${this.id}/${this.avatar}` : `img/avatar/${this.discriminator % 5}.png`}`;
	}

	get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = User;
