const Entity = require('Entity/Entity');

const Scene = (question) => {
	return Object.freeze(
		Object.assign(
			{
				question: question,

				setQuestion: (question) => {
					return Scene(question);
				}
			},
			Entity()
		)
	);
}

module.exports = Scene;
