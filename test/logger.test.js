'use strict';

const expect = require('chai').expect;

describe('Logger Integration Export', () => {

	let logger;

	before(() => {
		logger = require('../logger');
	});

	it('Logger export', done => {
		expect(logger).to.be.an('object');
		expect(logger).to.have.property('category');
		expect(logger).to.have.property('level');
		done();
	});

	it('Logger info package.json name', done => {
		logger.info({ message: 'package.json name'});

		setTimeout(done, 200);
	});

	it('Logger info with string', done => {
		logger.info('backward compatable');

		setTimeout(done, 200);
	});

	it('Logger info with array', done => {
		logger.info([
			'this is an array',
			'hope this works'
		]);

		setTimeout(done, 200);
	});

	it('Logger error with string', done => {
		logger.error('test error');

		setTimeout(done, 200);
	});

});