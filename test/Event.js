const should = require('chai').should();
const Event = require('Event/Event');
const Tone = require('Tone/Tone');

describe('Event', function() {

	context('setTitle', function() {

		it('should set the title of the Event to the given one when there was none', function() {
			const event = Event()({
				tone: Tone.Light
			});
			const result = event.setTitle('Title');
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Light
			}));
		});

		it('should set the title of the Event to the given one when there was already one', function() {
			const event = Event()({
				title: 'Title',
				tone: Tone.Light
			});
			const result = event.setTitle('New title');
			result.should.deep.equal(Event(event.id)({
				title: 'New title',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsLight', function() {

		it('should set the tone to Light', function() {
			const event = Event()({
				title: 'Title',
				tone: Tone.Dark
			});
			const result = event.setToneAsLight();
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsDark', function() {

		it('should set the tone to Dark', function() {
			const event = Event()({
				title: 'Title',
				tone: Tone.Light
			});
			const result = event.setToneAsDark();
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Dark
			}));
		});

	});

	describe('fromJSON', function() {

		it('should format to a correct JSON', function() {
			const event = Event.fromJSON({
				id: 'id',
				title: 'Title',
				tone: 'Light'
			});
			event.should.deep.equal(Event('id')({
				title: 'Title',
				tone: Tone.Light
			}));
		});

	});

});
