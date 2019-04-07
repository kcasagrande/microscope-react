const Entity = require('Entity/Entity');
const uuid = require('uuid/v4');

const Scene = (
	id = uuid()
) => (
	question = 'The question',
	requiredCharacters = [],
	forbiddenCharacters = []
) => {
	const scene = {
		id: id,
		question: question,
		requiredCharacters: requiredCharacters,
		forbiddenCharacters: forbiddenCharacters
	};

	const def = require('helper/ImmutableObject').defineMethod(scene);

	def('setQuestion', (question) => {
		return Scene(id)(question, requiredCharacters, forbiddenCharacters);
	});

	def('requireCharacter', (description) => {
		if(requiredCharacters.length < 2) {
			return Scene(id)(question, requiredCharacters.concat([description]), forbiddenCharacters);
		}
		else {
			throw Error('Can\'t have more than two required characters');
		}
	});

	def('freeCharacter', (description) => {
		return Scene(id)(question, requiredCharacters.filter((character) => character !== description), forbiddenCharacters);
	});

	def('forbidCharacter', (description) => {
		if(forbiddenCharacters.length < 2) {
			return Scene(id)(question, requiredCharacters, forbiddenCharacters.concat([description]));
		}
		else {
			throw Error('Can\'t have more than two forbidden characters');
		}
	});

	return Object.freeze(scene);
}

Scene.fromJSON = (json) => {
	return Scene(json.id)(json.question, json.requiredCharacters.slice());
}

module.exports = Scene;
