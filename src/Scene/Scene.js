const Entity = require('Entity/Entity');
const uuid = require('uuid/v4');

const Scene = (id = uuid()) => (question = 'The question', requiredCharacters = []) => {
	const scene = {
		id: id,
		question: question,
		requiredCharacters: requiredCharacters
	};

	const def = require('helper/ImmutableObject').defineMethod(scene);

	def('setQuestion', (question) => {
		return Scene(id)(question, requiredCharacters);
	});

	def('requireCharacter', (description) => {
		if(requiredCharacters.length < 2) {
			return Scene(id)(question, requiredCharacters.slice().concat([description]));
		}
		else {
			throw Error('Can\'t have more than two required characters');
		}
	});

	return Object.freeze(scene);
}

Scene.fromJSON = (json) => {
	return Scene(json.id)(json.question, json.requiredCharacters.slice());
}

module.exports = Scene;
