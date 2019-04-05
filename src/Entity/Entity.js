const uuid = require('uuid/v4');

const Entity = () => {
	const _id = uuid();

	return Object.freeze({
		id: _id
	});
}

Entity.findIndexOfId = (array, id) => {
	return array.findIndex((entity) => { return entity.id === id; });
}

module.exports = Entity;
