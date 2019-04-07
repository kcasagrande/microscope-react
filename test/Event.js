const should = require('chai').should();
const Event = require('Event/Event');

describe('Event', function() {

	context('setTitle', function() {

		it('should set the title of the Event to the given one when there was none', function() {
			const event = Event()();
			const result = event.setTitle('Title');
			result.should.deep.equal(Event(event.id)('Title'));
		});

		it('should set the title of the Event to the given one when there was already one', function() {
			const event = Event()('Title');
			const result = event.setTitle('New title');
			result.should.deep.equal(Event(event.id)('New title'));
		});

	});

	describe('fromJSON', function() {

		it('should format to a correct JSON', function() {
			const event = Event.fromJSON({
				id: 'id',
				title: 'Title'
			});
			event.should.deep.equal(Event('id')('Title'));
		});

	});

});
