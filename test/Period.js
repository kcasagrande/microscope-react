const should = require('chai').should();
const Period = require('Period/Period');
const Event = require('Event/Event');
const Tone = require('Tone/Tone');
const uuid = require('uuid/v4');
const NoEventWithId = require('Event/NoEventWithId');

describe('Period', function() {

	context('setTitle', function() {

		it('should set the title of the Period to the given one when there was none', function() {
			const period = new Period({
				tone: Tone.Light
			});
			const result = period.setTitle('Title');
			result.should.deep.equal(new Period({
				id: period.id,
				title: 'Title',
				tone: Tone.Light
			}));
		});

		it('should set the title of the Period to the given one when there was already one', function() {
			const period = new Period({
				title: 'Title',
				tone: Tone.Light
			});
			const result = period.setTitle('New title');
			result.should.deep.equal(new Period({
				id: period.id,
				title: 'New title',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsLight', function() {

		it('should set the tone to Light', function() {
			const period = new Period({
				title: 'Title',
				tone: Tone.Dark
			});
			const result = period.setToneAsLight();
			result.should.deep.equal(new Period({
				id: period.id,
				title: 'Title',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsDark', function() {

		it('should set the tone to Dark', function() {
			const period = new Period({
				title: 'Title',
				tone: Tone.Light
			});
			const result = period.setToneAsDark();
			result.should.deep.equal(new Period({
				id: period.id,
				title: 'Title',
				tone: Tone.Dark
			}));
		});

	});

	context('addEvent', function() {

		it('should add an Event when there were none', function() {
			const period = new Period({
				title: 'Title',
				tone: Tone.Light
			});
			const event = new Event();
			const result = period.addEvent({
				event: event
			});
			result.should.deep.equal(new Period({
				id: period.id,
				title: 'Title',
				tone: Tone.Light,
				events: [event]
			}));
		});

		it('should append an Event when there was already one', function() {
			const event = new Event();
			const period = new Period({
				title: 'Title',
				tone: Tone.Light,
				events: [event]
			});
			const newEvent = new Event();
			const result = period.addEvent({
				event: newEvent
			});
			result.should.deep.equal(new Period({
				id: period.id,
				title: 'Title',
				tone: Tone.Light,
				events: [event, newEvent]
			}));
		});

		it('should insert an Event before the one with the specified ID when there is a corresponding one', function() {
			const event1 = new Event();
			const event2 = new Event();
			const event3 = new Event();
			const period = new Period({
				title: 'Title',
				tone: Tone.Light,
				events: [event1, event2, event3]
			});
			const newEvent = new Event();
			const result = period.addEvent({
				event: newEvent,
				before: event2.id
			});
			result.should.deep.equal(new Period({
				id: period.id,
				title: 'Title',
				tone: Tone.Light,
				events: [event1, newEvent, event2, event3]
			}));
		});

		it('should throw when adding an Event before the one with the specified ID when there is no corresponding one', function() {
			const event1 = new Event();
			const event2 = new Event();
			const event3 = new Event();
			const eventId = uuid();
			const period = new Period({
				title: 'Title',
				tone: Tone.Light,
				events: [event1, event2, event3]
			});
			const newEvent = new Event();
			(() => period.addEvent({
				event: newEvent,
				before: eventId
			})).should.throw(NoEventWithId, 'No Event with ID ' + eventId);
		});

	});

	context('toJSON', function() {

		it('should format to a correct JSON', function() {
			const event1 = new Event();
			const event2 = new Event();
			const period = new Period({
				id: 'id',
				title: 'Title',
				tone: Tone.Light,
				events: [event1, event2]
			});
			period.toJSON().should.deep.equal({
				id: 'id',
				title: 'Title',
				tone: 'Light',
				events: [event1.toJSON(), event2.toJSON()]
			});
		});

	});

	context('fromJSON', function() {

		it('should parse a correct JSON', function() {
			const event1 = new Event();
			const event2 = new Event();
			const period = Period.fromJSON({
				id: 'id',
				title: 'Title',
				tone: 'Light',
				events: [event1.toJSON(), event2.toJSON()]
			});
			period.should.deep.equal(new Period({
				id: 'id',
				title: 'Title',
				tone: Tone.Light,
				events: [event1, event2]
			}));
		});

	});

});
