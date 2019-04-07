const Entity = require('Entity/Entity');
const uuid = require('uuid/v4');

const Scene = (
	id = uuid()
) => (
	question = 'The question',
	requiredCharacters = [],
	forbiddenCharacters = [],
	frame = '',
	answer = ''
) => {
	const scene = {
		id: id,
		question: question,
		requiredCharacters: requiredCharacters,
		forbiddenCharacters: forbiddenCharacters,
		frame: frame,
		answer: answer
	};

	const def = require('helper/ImmutableObject').defineMethod(scene);

	def('setQuestion', (question) => {
		return Scene(id)(question, requiredCharacters, forbiddenCharacters, frame, answer);
	});

	def('requireCharacter', (requiredCharacter) => {
		if(requiredCharacters.length < 2) {
			return Scene(id)(question, requiredCharacters.concat([requiredCharacter]), forbiddenCharacters, frame, answer);
		}
		else {
			throw Error('Can\'t have more than two required characters');
		}
	});

	def('freeCharacter', (freedCharacter) => {
		return Scene(id)(question, requiredCharacters.filter((character) => character !== freedCharacter), forbiddenCharacters, frame, answer);
	});

	def('forbidCharacter', (forbiddenCharacter) => {
		if(forbiddenCharacters.length < 2) {
			return Scene(id)(question, requiredCharacters, forbiddenCharacters.concat([forbiddenCharacter]), frame, answer);
		}
		else {
			throw Error('Can\'t have more than two forbidden characters');
		}
	});

	def('setupFrame', (frame) => {
		return Scene(id)(question, requiredCharacters, forbiddenCharacters, frame, answer);
	});

	def('setAnswer', (answer) => {
		return Scene(id)(question, requiredCharacters, forbiddenCharacters, frame, answer);
	});

	return Object.freeze(scene);
}

Scene.fromJSON = (json) => {
	return Scene(json.id)(json.question, json.requiredCharacters.slice());
}

module.exports = Scene;
