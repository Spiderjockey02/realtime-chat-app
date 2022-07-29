// Dependencies
import chalk from 'chalk'


const	onFinished = require('on-finished'),
	moment = require('moment'),
	{ getIP } = require('./functions'),
	log = require('simple-node-logger').createRollingFileLogger({
		logDirectory: './utils/logs',
		fileNamePattern: 'roll-<DATE>.log',
		dateFormat: 'YYYY.MM.DD',
	});

type logTypes =	"log" | "warn" | "error" | "debug"| "cmd"| "ready"


// Logger
export default {
	log: function (content: string, type:logTypes = "log") {
		if (content == 'error') return;
		const timestamp = `[${moment().format('HH:mm:ss:SSS')}]:`;
		switch (type) {
			case 'log':
				log.info(content);
				console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
				break;
			case 'warn':
				log.warn(content);
				console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
				break;
			case 'error':
				log.error(content);
				console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
				break;
			case 'debug':
				log.debug(content);
				console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
				break;
			case 'cmd':
				log.info(content);
				console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
				break;
			case 'ready':
				log.info(content);
				console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
				break;
			default:
				break;
		}
	},
	connection: async function(req, res) {
		req._startTime = new Date().getTime();
		req._endTime = undefined;

		// response data
		res._startTime = new Date().getTime();
		res._endTime = undefined;

		onFinished(req, function() {
			req._endTime = new Date().getTime();
			onFinished(res, function() {
				res._endTime = new Date().getTime();

				// Get additional information
				const	method = req.method,
					url = req.originalUrl || req.url,
					status = res.statusCode,
					color = status >= 500 ? 'bgRed' : status >= 400 ? 'bgMagenta' : status >= 300 ? 'bgCyan' : status >= 200 ? 'bgGreen' : 'dim',
					requester = getIP(req);

				// How long did it take for the page to load
				let response_time;
				if (res._endTime && req._endTime) response_time = (res._endTime + req._endTime) - (res._startTime + req._startTime);

				// log
				if ((url.startsWith('/js') || url.startsWith('/css'))) {
					return require('./logger').log(`${requester} ${method} ${url} ${chalk[color](status)} - ${(response_time ?? '?')} ms`, 'debug');
				}
				require('./logger').log(`${requester} ${method} ${url} ${chalk[color](status)} - ${(response_time ?? '?')} ms`, 'log');
			});
		});
	},
	warn: (...args) => this.log(...args, 'warn'),
	error: (...args) => this.log(...args, 'error'),
	debug: (...args) => this.log(...args, 'debug'),
	cmd: (...args) => this.log(...args, 'cmd'),
	ready: (...args) => this.log(...args, 'ready')
}
