const Tone = require('Tone/Tone');
const Event = require('Event/Event');
const uuid = require('uuid/v4');
require('helper/ImmutableArray')();
const NoEventWithId = require('Event/NoEventWithId');

const Period = ({
	id = uuid(),
	title = '',
	tone = Tone.Light,
	events = []
} = {}) => {
	const period = {
		id: id,
		title: title,
		tone: tone,
		events: events
	}

	const def = require('helper/ImmutableObject').defineMethod(period);

	def('setTitle', (title) => {
		return Period({
			id: id,
			title: title,
			tone: tone,
			events: events
		});
	});

	def('setToneAsLight', () => {
		return Period({
			id: id,
			title: title,
			tone: Tone.Light,
			events: events
		});
	});

	def('setToneAsDark', () => {
		return Period({
			id: id,
			title: title,
			tone: Tone.Dark,
			events: events
		});
	});

	def('addEvent', ({
		event = Event(),
		before = undefined
	} = {}) => {
		if(before) {
			try {
				return Period({
					id: id,
					title: title,
					tone: tone,
					events: events.insertBefore(((event) => event.id === before), [event])
				});
			}
			catch(error) {
				if(error.message === 'No such element') {
					throw new NoEventWithId(before);
				}
				else {
					throw error;
				}
			}
		}
		else {
			return Period({
				id: id,
				title: title,
				tone: tone,
				events: events.concat([event])
			});
		}
	});

	def('toJSON', () => {
		return {
			id: id,
			title: title,
			tone: tone.toJSON(),
			events: events.map((event) => event.toJSON())
		};
	});

	return Object.freeze(period);
};

Period.fromJSON = (json) => {
	return Period({
		id: json.id,
		title: json.title,
		tone: Tone.fromJSON(json.tone),
		events: json.events.map(Event.fromJSON)
	});
};

module.exports = Period;
