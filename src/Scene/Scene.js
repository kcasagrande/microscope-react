const Entity = require('Entity/Entity');

const Scene = (question, requiredCharacters = []) => {
	return Object.freeze(
		Object.assign(
			{
				question: question,
				requiredCharacters: requiredCharacters,

				setQuestion: (question) => {
					return Scene(question, requiredCharacters);
				},

				requireCharacter: (description) => {
					return Scene(question, requiredCharacters.slice().concat([description]));
				}
			},
			Entity()
		)
	);
}

module.exports = Scene;
