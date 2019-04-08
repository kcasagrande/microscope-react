class NoEventWithId extends Error {
	constructor(id) {
		super('No Event with ID ' + id);
	}
}

module.exports = NoEventWithId;
