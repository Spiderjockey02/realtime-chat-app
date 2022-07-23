// get the IP of the client
module.exports = {
	getIP: function(req) {
		return req.ip ||
      req._remoteAddress ||
      (req.connection && req.connection.remoteAddress) ||
      undefined;
	},
	formatTag: function(user) {
		return `${user.username}#${user.discriminator}`;
	},
};
