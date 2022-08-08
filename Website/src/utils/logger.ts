// Dependencies
import chalk from 'chalk';
import onFinished from 'on-finished';
import moment from 'moment';
import { createRollingFileLogger } from 'simple-node-logger';
import getIP from './functions';
import type { NextRequest, NextResponse } from 'next/server';

type logTypes =	'log' | 'warn' | 'error' | 'debug'| 'cmd'| 'ready'

const log = createRollingFileLogger({
	logDirectory: './utils/logs',
	fileNamePattern: 'roll-<DATE>.log',
	dateFormat: 'YYYY.MM.DD',
});


class Logger {

	log(content: string, type:logTypes = 'log') {
		if (content == 'error') return;
		const timestamp = `[${moment().format('HH:mm:ss:SSS')}]:`;
		switch (type) {
			case 'log':
				log.info(content);
				console.log(`${timestamp} } ${content} `);
				break;
			case 'warn':
				log.warn(content);
				console.log(`${timestamp}  ${content} `);
				break;
			case 'error':
				log.error(content);
				console.log(`${timestamp}  ${content} `);
				break;
			case 'debug':
				log.debug(content);
				console.log(`${timestamp}  ${content} `);
				break;
			case 'cmd':
				log.info(content);
				console.log(`${timestamp}  ${content}`);
				break;
			case 'ready':
				log.info(content);
				console.log(`${timestamp}  ${content}`);
				break;
			default:
				break;
		}
	}
	connection(req: NextRequest, res: NextResponse) {
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
					url = req.nextUrl || req.url,
					status = res.statusCode,
					color = status >= 500 ? 'bgRed' : status >= 400 ? 'bgMagenta' : status >= 300 ? 'bgCyan' : status >= 200 ? 'bgGreen' : 'dim',
					requester = getIP(req);

				// How long did it take for the page to load
				let response_time;
				if (res._endTime && req._endTime) response_time = (res._endTime + req._endTime) - (res._startTime + req._startTime);

				// log
				if ((url.startsWith('/js') || url.startsWith('/css'))) {
					return this.log(`${requester} ${method} ${url}  - ${(response_time ?? '?')} ms`, 'debug');
				}
				this.log(`${requester} ${method} ${url} - ${(response_time ?? '?')} ms`, 'log');
			});
		});
	}
	warn(content: string) {
		this.log(content, 'warn');
	}
	error(content: string) {
		this.log(content, 'error');
	}
	debug(content: string) {
		this.log(content, 'debug');
	}
	cmd(content: string) {
		this.log(content, 'cmd');
	}
	ready(content: string) {
		this.log(content, 'ready');
	}
}


// Logger
export default Logger;
