const Entity = require('Entity/Entity');

const Event = (title) => {
	return Object.freeze(
		Object.assign(
			{
				title: title
			},
			Entity()
		)
	);
};

module.exports = Event;
