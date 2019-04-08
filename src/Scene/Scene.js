const Tone = require('Tone/Tone');
const uuid = require('uuid/v4');

const Scene = ({
	id = uuid(),
	question = 'The question',
	frame = '',
	requiredCharacters = [],
	forbiddenCharacters = [],
	answer = '',
	tone = Tone.Light
} = {}) => {
	const scene = {
		id: id,
		question: question,
		frame: frame,
		requiredCharacters: requiredCharacters,
		forbiddenCharacters: forbiddenCharacters,
		answer: answer,
		tone: tone
	};

	const def = require('helper/ImmutableObject').defineMethod(scene);

	def('setQuestion', (question) => {
		return Scene({
			id: id,
			question: question,
			frame: frame,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone
		});
	});

	def('requireCharacter', (requiredCharacter) => {
		if(requiredCharacters.length < 2) {
			return Scene({
				id: id,
				question: question,
				frame: frame,
				requiredCharacters: requiredCharacters.concat([requiredCharacter]),
				forbiddenCharacters: forbiddenCharacters,
				answer: answer,
				tone: tone
			});
		}
		else {
			throw Error('Can\'t have more than two required characters');
		}
	});

	def('freeCharacter', (freedCharacter) => {
		return Scene({
			id: id,
			question: question,
			frame: frame,
			requiredCharacters: requiredCharacters.filter((character) => character !== freedCharacter),
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone
		});
	});

	def('forbidCharacter', (forbiddenCharacter) => {
		if(forbiddenCharacters.length < 2) {
			return Scene({
				id: id,
				question: question,
				frame: frame,
				requiredCharacters: requiredCharacters,
				forbiddenCharacters: forbiddenCharacters.concat([forbiddenCharacter]),
				answer: answer,
				tone: tone
			});
		}
		else {
			throw Error('Can\'t have more than two forbidden characters');
		}
	});

	def('allowCharacter', (allowedCharacter) => {
		return Scene({
			id: id,
			question: question,
			frame: frame,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters.filter((character) => character !== allowedCharacter),
			answer: answer,
			tone: tone
		});
	});

	def('setupFrame', (frame) => {
		return Scene({
			id: id,
			question: question,
			frame: frame,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone
		});
	});

	def('setAnswer', (answer) => {
		return Scene({
			id: id,
			question: question,
			frame: frame,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone
		});
	});

	def('setToneAsLight', () => {
		return Scene({
			id: id,
			question: question,
			frame: frame,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: Tone.Light
		});
	});

	def('setToneAsDark', () => {
		return Scene({
			id: id,
			question: question,
			frame: frame,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: Tone.Dark
		});
	});

	return Object.freeze(scene);
}

Scene.fromJSON = (json) => {
	return Scene({
		id: json.id,
		question: json.question,
		frame: json.frame,
		requiredCharacters: json.requiredCharacters.slice(),
		forbiddenCharacters: json.forbiddenCharacters.slice(),
		answer: json.answer,
		tone: Tone.fromJSON(json.tone)
	});
}

module.exports = Scene;
