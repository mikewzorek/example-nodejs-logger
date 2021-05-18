'use strict';

const request = require('request-promise');
const os = require('os');

module.exports = {
    name: 'graylog',
    appender: appender,
    configure: configure
};

function configure (params) {
    return appender(Object.assign({
            type   : 'graylog',
            host   : 'logger-example-url.com',
            port   : 12202
        }, params));
}

function appender (params) {
    return logEvent => request.post('http://' + params.host + ':' + params.port + '/gelf', {
            body: Object.assign(fmtContent(logEvent), {
                appKey  : params.appKey,
                service : params.service || '',
                host    : os.hostname()
            }),
            json: true
        });
}

function fmtContent (logEvent) {
    let content = logEvent && logEvent.data && logEvent.data[0];

    if (typeof content === 'string') {
        return { message: content };
    }
    if (Object.prototype.toString.call(content) === '[object Object]') {
        return content;
    }
    return { message: JSON.stringify(content) };
}