const uuid = require('uuid/v4');

const Event = (id = uuid()) => (title = '') => {
	const event = {
		id: id,
		title: title
	}

	const def = require('helper/ImmutableObject').defineMethod(event);

	def('setTitle', (title) => {
		return Event(id)(title);
	});

	return Object.freeze(event);
};

Event.fromJSON = (json) => {
	return Event(json.id)(json.title);
};

module.exports = Event;
