class NoSceneWithId extends Error {
	constructor(id) {
		super('No Scene with ID ' + id);
	}
}

module.exports = NoSceneWithId;
