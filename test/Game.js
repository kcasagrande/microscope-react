const should = require('chai').should();
const Game = require('Game/Game');
const Period = require('Period/Period');

describe('Game', function() {

	it('should have two Periods by default when created', function() {
		const game = new Game({
			bigPicture: 'Big Picture'
		});
		game.periods.should.have.lengthOf(2);
	});

});
