const should = require('chai').should();
const assert = require('chai').assert;
const Game = require('Game/Game');
const Period = require('Period/Period');

describe('Game', function() {

	it('should have two Periods by default when created', function() {
		const game = Game('Big Picture', null, null);
		game.periods.should.have.lengthOf(2);
	});

	describe('addPeriod', function() {

		context('after adding a Period to a freshly created Game', function() {

			it('should have three Period', function() {
				const startPeriod = Period('start', 'Start');
				const endPeriod = Period('end', 'End');
				const newPeriod = Period('new', 'New');
				const game = Game('BigPicture', startPeriod, endPeriod).addPeriod(undefined, newPeriod);
				assert.deepEqual(
					game.periods,
					[
						startPeriod,
						newPeriod,
						endPeriod
					]
				);
			});

		});

		context('after adding a Period to a Game with three Period', function() {

			it('should have four Period', function() {
				const startPeriod = Period('start', 'Start');
				const endPeriod = Period('end', 'End');
				const existingPeriod = Period('existing', 'Existing');
				const newPeriod = Period('new', 'New');
				const game = Game('BigPicture', startPeriod, endPeriod, [existingPeriod]).addPeriod('existing', newPeriod);
				assert.deepEqual(
					game.periods,
					[
						startPeriod,
						newPeriod,
						existingPeriod,
						endPeriod
					]
				);
			});

		});

	});

});
