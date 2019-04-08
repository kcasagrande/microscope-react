const Tone = require('Tone/Tone');
const uuid = require('uuid/v4');

const Event = (id = uuid()) => ({
	title = '',
	tone = Tone.Light
}) => {
	const event = {
		id: id,
		title: title,
		tone: tone
	}

	const def = require('helper/ImmutableObject').defineMethod(event);

	def('setTitle', (title) => {
		return Event(id)({
			title: title,
			tone: tone
		});
	});

	def('setToneAsLight', () => {
		return Event(id)({
			title: title,
			tone: Tone.Light
		});
	});

	def('setToneAsDark', () => {
		return Event(id)({
			title: title,
			tone: Tone.Dark
		});
	});

	return Object.freeze(event);
};

Event.fromJSON = (json) => {
	return Event(json.id)({
		title: json.title,
		tone: Tone.fromJSON(json.tone)
	});
};

module.exports = Event;
