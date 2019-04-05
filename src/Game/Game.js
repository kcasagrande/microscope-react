const Entity = require('Entity/Entity');
const Period = require('Period/Period');

const Game = (bigPicture = 'Big Picture', startPeriod = Period('Start'), endPeriod = Period('End'), otherPeriods = []) => {
	const periods = [ startPeriod ].concat(otherPeriods).concat([ endPeriod ]);

	const findIndexOfPeriodId = (periodId) => {
		return Entity.findIndexOfId(otherPeriods, periodId);
	};

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
		},

		addPeriod: (beforeId, period) => {
			let newPeriods;
			if(beforeId) {
				const insertIndex = findIndexOfPeriodId(beforeId);
				newPeriods = otherPeriods
					.slice(0, insertIndex)
					.concat([period])
					.concat(otherPeriods.slice(insertIndex));
			}
			else {
				newPeriods = otherPeriods.slice().concat([period]);
			}
			return Game(bigPicture, startPeriod, endPeriod, newPeriods);
		},

		removePeriod: (periodId) => {
			const periodIndex = findIndexOfPeriodId(periodId);
			if(periodIndex === -1) {
				return Game(bigPicture, startPeriod, endPeriod, otherPeriods);
			}
			else {
				return Game(bigPicture, startPeriod, endPeriod, otherPeriods.slice(0, periodIndex).concat(otherPeriods.slice(1 + periodIndex)));
			}
		}
	});
}

module.exports = Game;
