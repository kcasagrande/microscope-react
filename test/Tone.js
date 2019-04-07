const should = require('chai').should();
const Tone = require('Tone/Tone');

describe('Tone.Light', function() {

	context('toggle', function() {

		it('should return Tone.Dark', function() {
			Tone.Light.toggle().should.equal(Tone.Dark);
		});

	});

});

describe('Tone.Dark', function() {

	context('toggle', function() {

		it('should return Tone.Light', function() {
			Tone.Dark.toggle().should.equal(Tone.Light);
		});

	});

});

describe('Tone', function() {

	context('fromJSON', function() {

		it('should return Tone.Light when the JSON value is \'Light\'', function() {
			Tone.fromJSON('Light').should.equal(Tone.Light);
		});

		it('should return Tone.Dark when the JSON value is \'Dark\'', function() {
			Tone.fromJSON('Dark').should.equal(Tone.Dark);
		});

	});

});
