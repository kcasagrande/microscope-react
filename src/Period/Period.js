const Tone = require('Tone/Tone');
const Event = require('Event/Event');
const uuid = require('uuid/v4');
require('helper/ImmutableArray')();
const NoEventWithId = require('Event/NoEventWithId');
const ImmutableObject = require('helper/ImmutableObject');

class Period {
	constructor({
		id = uuid(),
		title = '',
		tone = Tone.Light,
		events = []
	} = {}) {
		ImmutableObject.defineProperty(this)('id', id);
		ImmutableObject.defineProperty(this)('title', title);
		ImmutableObject.defineProperty(this)('tone', tone);
		ImmutableObject.defineProperty(this)('events', events);
	}

	setTitle(title) {
		return new Period({
			id: this.id,
			title: title,
			tone: this.tone,
			events: this.events
		});
	}

	setToneAsLight() {
		return new Period({
			id: this.id,
			title: this.title,
			tone: Tone.Light,
			events: this.events
		});
	}

	setToneAsDark() {
		return new Period({
			id: this.id,
			title: this.title,
			tone: Tone.Dark,
			events: this.events
		});
	}

	addEvent({
		event = new Event(),
		before = undefined
	} = {}) {
		if(before) {
			try {
				return new Period({
					id: this.id,
					title: this.title,
					tone: this.tone,
					events: this.events.insertBefore(((event) => event.id === before), [event])
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
			return new Period({
				id: this.id,
				title: this.title,
				tone: this.tone,
				events: this.events.concat([event])
			});
		}
	}

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			tone: this.tone.toJSON(),
			events: this.events.map((event) => event.toJSON())
		};
	}

	static fromJSON(json) {
		return new Period({
			id: json.id,
			title: json.title,
			tone: Tone.fromJSON(json.tone),
			events: json.events.map(Event.fromJSON)
		});
	}

};

module.exports = Period;
