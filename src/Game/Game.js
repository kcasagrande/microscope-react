const Period = require('Period/Period');

const Game = (bigPicture = 'Big Picture', startPeriod = Period('Start'), endPeriod = Period('End'), otherPeriods = []) => {
	const periods = [ startPeriod ].concat(otherPeriods).concat([ endPeriod ]);

	return Object.freeze({
		bigPicture: bigPicture,
		periods: periods,

		toJSON: () => {
			return {
				bigPicture: bigPicture,
				periods: periods.map((period) => period.toJSON())
			};
		},

		setBigPicture: (bigPicture) => {
			return Game(bigPicture, startPeriod, endPeriod, otherPeriods);
		}
	});
}

Game.fromJSON = (json) => {
	return Game(json.bigPicture, Period.fromJSON(json.periods[0]), Period.fromJSON(json.periods[json.periods.length - 1]), json.periods.slice(1, -1));
}

module.exports = Game;
