'use strict';

const log4js = require('log4js');

let LOGGER;

module.exports = LOGGER || new Logger();

function Logger () {
	this.createLogger = createLogger.bind(this);
	this.export = () => LOGGER;
	return this.createLogger().export();
}

function createLogger () {
	if(!process.env.NODE_ENV){
		log4js.configure({
			appenders: { console: { type: 'console' } },
			categories: { default:{ appenders: [ 'console' ], level: process.env.LOG_LEVEL } }
		});
	}
	else{
		if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() !== 'local') {
			log4js.configure({
				appenders: {
					gelf: { type: '@log4js-node/gelf', host: process.env.GRAYLOG_HOST, hostname: process.env.SERVICE_NAME,  port: process.env.GRAYLOG_PORT, customFields: { '_appKey': process.env.GRAYLOG_APPKEY } }
				},
				categories: {
					default: { appenders: ['gelf'], level: process.env.LOG_LEVEL }
				}
			});
		}
		else{
			log4js.configure({
				appenders: {
					everything: { type: 'dateFile', filename: 'logs/service.log', pattern: '-dd-hh', maxLogSize: process.env.LOG_MAXLOGSIZE, backups: process.env.LOG_BACKUPS } 
				},
				categories: {
					default: { appenders: [ 'everything' ], level: process.env.LOG_LEVEL }
				} 
			});
		}
	}
	LOGGER = log4js.getLogger(process.env.LOG_CATEGORY);

	return this;
}