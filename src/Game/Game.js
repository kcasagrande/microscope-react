const Period = require('Period/Period');
const ImmutableObject = require('helper/ImmutableObject');

class Game {
	constructor({
		bigPicture = 'Big Picture',
		startPeriod = new Period('Start'),
		endPeriod = new Period('End'),
		otherPeriods = []
	} = {}) {
		ImmutableObject.defineProperty(this)('bigPicture', bigPicture);
		ImmutableObject.defineProperty(this)('periods', [ startPeriod ].concat(otherPeriods).concat([ endPeriod ]));
	}

	toJSON() {
		return new Game({
			bigPicture: this.bigPicture,
			periods: this.periods.map((period) => period.toJSON())
		});
	}

	setBigPicture(bigPicture) {
		return new Game({
			bigPicture: bigPicture,
			startPeriod: this.periods[0],
			endPeriod: this.periods[this.periods.length - 1],
			otherPeriods: this.periods.slice(1, -1)
		});
	}

	static fromJSON(json) {
		const periods = json.periods.map(Period.fromJSON)
		return new Game({
			bigPicture: json.bigPicture,
			startPeriod: periods[0],
			endPeriod: periods[periods.length - 1],
			otherPeriods: periods.slice(1, -1)
		});
	}

}

module.exports = Game;
