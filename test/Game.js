const should = require('chai').should();
const assert = require('chai').assert;
const Game = require('Game/Game');
const Period = require('Period/Period');

describe('Game', function() {

	it('should have two Periods by default when created', function() {
		const game = Game('Big Picture', null, null);
		game.periods.should.have.lengthOf(2);
	});

});
