const Entity = require('Entity/Entity');

const Period = (title, events = []) => {
	return Object.freeze(
		Object.assign(
			{
				title: title,
				events: events
			},
			Entity()
		)
	);
}

module.exports = Period;
