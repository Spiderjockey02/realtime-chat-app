// get the IP of the client

export function getIP(req) {
	return req.ip ||
		req._remoteAddress ||
		(req.connection && req.connection.remoteAddress) ||
		undefined;
}
