const Tone = require('Tone/Tone');
const uuid = require('uuid/v4');

const PlayedScene = ({
	id = uuid(),
	question = 'The question',
	stage = '',
	requiredCharacters = [],
	forbiddenCharacters = [],
	answer = '',
	tone = Tone.Light
} = {}) => {
	const scene = {
		id: id,
		question: question,
		stage: stage,
		requiredCharacters: requiredCharacters,
		forbiddenCharacters: forbiddenCharacters,
		answer: answer,
		tone: tone
	};

	const def = require('helper/ImmutableObject').defineMethod(scene);

	def('setQuestion', (question) => {
		return PlayedScene({
			id: id,
			question: question,
			stage: stage,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone
		});
	});

	def('requireCharacter', (requiredCharacter) => {
		if(requiredCharacters.length < 2) {
			return PlayedScene({
				id: id,
				question: question,
				stage: stage,
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
		return PlayedScene({
			id: id,
			question: question,
			stage: stage,
			requiredCharacters: requiredCharacters.filter((character) => character !== freedCharacter),
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone
		});
	});

	def('forbidCharacter', (forbiddenCharacter) => {
		if(forbiddenCharacters.length < 2) {
			return PlayedScene({
				id: id,
				question: question,
				stage: stage,
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
		return PlayedScene({
			id: id,
			question: question,
			stage: stage,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters.filter((character) => character !== allowedCharacter),
			answer: answer,
			tone: tone
		});
	});

	def('setStage', (stage) => {
		return PlayedScene({
			id: id,
			question: question,
			stage: stage,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone
		});
	});

	def('setAnswer', (answer) => {
		return PlayedScene({
			id: id,
			question: question,
			stage: stage,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone
		});
	});

	def('setToneAsLight', () => {
		return PlayedScene({
			id: id,
			question: question,
			stage: stage,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: Tone.Light
		});
	});

	def('setToneAsDark', () => {
		return PlayedScene({
			id: id,
			question: question,
			stage: stage,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: Tone.Dark
		});
	});

	def('toJSON', () => {
		return {
			id: id,
			question: question,
			stage: stage,
			requiredCharacters: requiredCharacters,
			forbiddenCharacters: forbiddenCharacters,
			answer: answer,
			tone: tone.toJSON()
		};
	});

	return Object.freeze(scene);
}

PlayedScene.fromJSON = (json) => {
	return PlayedScene({
		id: json.id,
		question: json.question,
		stage: json.stage,
		requiredCharacters: json.requiredCharacters.slice(),
		forbiddenCharacters: json.forbiddenCharacters.slice(),
		answer: json.answer,
		tone: Tone.fromJSON(json.tone)
	});
}

module.exports = PlayedScene;
