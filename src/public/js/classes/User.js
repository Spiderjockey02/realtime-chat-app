class User {
	constructor(user) {
		this.username = user.username;
		this.discriminator = user.discriminator;
	}
	get tag() {
		return `${this.username}#${this.discriminator}`;
	}
	toString() {
		return `<@${this.id}>`;
	}
}
