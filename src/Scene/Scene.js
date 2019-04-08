const Tone = require('Tone/Tone');
const uuid = require('uuid/v4');

const Scene = (
	id = uuid()
) => ({
	question = 'The question',
	requiredCharacters = [],
	forbiddenCharacters = [],
	frame = '',
	answer = '',
	tone = Tone.Light
}) => {
	const scene = {
		id: id,
		question: question,
		requiredCharacters: requiredCharacters,
		forbiddenCharacters: forbiddenCharacters,
		frame: frame,
		answer: answer,
		tone: tone
	};

	const def = require('helper/ImmutableObject').defineMethod(scene);

	def('setQuestion', (question) => {
		return Scene(id)({
			question: question,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			frame: frame,
			answer: answer,
			tone: tone
		});
	});

	def('requireCharacter', (requiredCharacter) => {
		if(requiredCharacters.length < 2) {
			return Scene(id)({
				question: question,
				requiredCharacters: requiredCharacters.concat([requiredCharacter]),
				forbiddenCharacters: forbiddenCharacters,
				frame: frame,
				answer: answer,
				tone: tone
			});
		}
		else {
			throw Error('Can\'t have more than two required characters');
		}
	});

	def('freeCharacter', (freedCharacter) => {
		return Scene(id)({
			question: question,
			requiredCharacters: requiredCharacters.filter((character) => character !== freedCharacter),
			forbiddenCharacters: forbiddenCharacters,
			frame: frame,
			answer: answer,
			tone: tone
		});
	});

	def('forbidCharacter', (forbiddenCharacter) => {
		if(forbiddenCharacters.length < 2) {
			return Scene(id)({
				question: question,
				requiredCharacters: requiredCharacters,
				forbiddenCharacters: forbiddenCharacters.concat([forbiddenCharacter]),
				frame: frame,
				answer: answer,
				tone: tone
			});
		}
		else {
			throw Error('Can\'t have more than two forbidden characters');
		}
	});

	def('allowCharacter', (allowedCharacter) => {
		return Scene(id)({
			question: question,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters.filter((character) => character !== allowedCharacter),
			frame: frame,
			answer: answer,
			tone: tone
		});
	});

	def('setupFrame', (frame) => {
		return Scene(id)({
			question: question,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			frame: frame,
			answer: answer,
			tone: tone
		});
	});

	def('setAnswer', (answer) => {
		return Scene(id)({
			question: question,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			frame: frame,
			answer: answer,
			tone: tone
		});
	});

	return Object.freeze(scene);
}

Scene.fromJSON = (json) => {
	return Scene(json.id)({
		question: json.question,
		requiredCharacters: json.requiredCharacters.slice(),
		forbiddenCharacters: json.forbiddenCharacters.slice(),
		frame: json.frame,
		answer: json.answer,
		tone: Tone.fromJSON(json.tone)
	});
}

module.exports = Scene;
