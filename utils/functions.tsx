// get the IP of the client
export default {
	getIP: function(req) {
		return req.ip ||
      req._remoteAddress ||
      (req.connection && req.connection.remoteAddress) ||
      undefined;
	},
};
