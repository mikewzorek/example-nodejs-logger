# Example Logger

---

This module provides a log4js implementation sending logs to Graylog.

## Installation

Install via the internal npm registry.

 npm install --save logger-example

## Config

By default messages will only be logged to the console.

To log to File located at /logs/service.log set NODE_ENV=local

To log to graylog set NODE_ENV=anything_but_local

- type: 'graylog',
- host: 'internal-logger-url.com',
- port: 12201
- appKey: '1234',
- service: [The name property of the package.json file in the running process],
- host: os.hostname()

## Usage
 
 var log = require('logger-example');

 // Log string values
 log.trace('Hello World');
 log.debug('Hello World');
 log.info('Hello World');
 log.warn('Hello World');
 log.error('Hello World');
 log.fatal('Hello World');

 // Log objects (key value pairs)
 log.info({ message: 'Hello World', foo: 'bar' });
