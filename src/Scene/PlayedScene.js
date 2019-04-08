const Tone = require('Tone/Tone');
const Scene = require('Scene/Scene');
const uuid = require('uuid/v4');
const ImmutableObject = require('helper/ImmutableObject');

class PlayedScene extends Scene {
	constructor({
		id = uuid(),
		question = 'The question',
		stage = '',
		requiredCharacters = [],
		forbiddenCharacters = [],
		answer = '',
		tone = Tone.Light
	} = {}) {
		super({
			id: id,
			question: question,
			answer: answer,
			tone: tone
		});

		ImmutableObject.defineProperty(this)('stage', stage);
		ImmutableObject.defineProperty(this)('requiredCharacters', requiredCharacters);
		ImmutableObject.defineProperty(this)('forbiddenCharacters', forbiddenCharacters);
	}

	setQuestion(question) {
		return new PlayedScene({
			id: this.id,
			question: question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters,
			forbiddenCharacters: this.forbiddenCharacters,
			answer: this.answer,
			tone: this.tone
		});
	}

	requireCharacter(requiredCharacter) {
		if(this.requiredCharacters.length < 2) {
			return new PlayedScene({
				id: this.id,
				question: this.question,
				stage: this.stage,
				requiredCharacters: this.requiredCharacters.concat([requiredCharacter]),
				forbiddenCharacters: this.forbiddenCharacters,
				answer: this.answer,
				tone: this.tone
			});
		}
		else {
			throw Error('Can\'t have more than two required characters');
		}
	}

	freeCharacter(freedCharacter) {
		return new PlayedScene({
			id: this.id,
			question: this.question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters.filter((character) => character !== freedCharacter),
			forbiddenCharacters: this.forbiddenCharacters,
			answer: this.answer,
			tone: this.tone
		});
	}

	forbidCharacter(forbiddenCharacter) {
		if(this.forbiddenCharacters.length < 2) {
			return new PlayedScene({
				id: this.id,
				question: this.question,
				stage: this.stage,
				requiredCharacters: this.requiredCharacters,
				forbiddenCharacters: this.forbiddenCharacters.concat([forbiddenCharacter]),
				answer: this.answer,
				tone: this.tone
			});
		}
		else {
			throw Error('Can\'t have more than two forbidden characters');
		}
	}

	allowCharacter(allowedCharacter) {
		return new PlayedScene({
			id: this.id,
			question: this.question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters,
			forbiddenCharacters: this.forbiddenCharacters.filter((character) => character !== allowedCharacter),
			answer: this.answer,
			tone: this.tone
		});
	}

	setStage(stage) {
		return new PlayedScene({
			id: this.id,
			question: this.question,
			stage: stage,
			requiredCharacters: this.requiredCharacters,
			forbiddenCharacters: this.forbiddenCharacters,
			answer: this.answer,
			tone: this.tone
		});
	}

	setAnswer(answer) {
		return new PlayedScene({
			id: this.id,
			question: this.question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters,
			forbiddenCharacters: this.forbiddenCharacters,
			answer: answer,
			tone: this.tone
		});
	}

	setToneAsLight() {
		return new PlayedScene({
			id: this.id,
			question: this.question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters,
			forbiddenCharacters: this.forbiddenCharacters,
			answer: this.answer,
			tone: Tone.Light
		});
	}

	setToneAsDark() {
		return new PlayedScene({
			id: this.id,
			question: this.question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters,
			forbiddenCharacters: this.forbiddenCharacters,
			answer: this.answer,
			tone: Tone.Dark
		});
	}

	toJSON() {
		return Object.freeze({
			id: this.id,
			question: this.question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters,
			forbiddenCharacters: this.forbiddenCharacters,
			answer: this.answer,
			tone: this.tone.toJSON()
		});
	}

	static fromJSON(json) {
		return new PlayedScene({
			id: json.id,
			question: json.question,
			stage: json.stage,
			requiredCharacters: json.requiredCharacters.slice(),
			forbiddenCharacters: json.forbiddenCharacters.slice(),
			answer: json.answer,
			tone: Tone.fromJSON(json.tone)
		});
	}
}


module.exports = PlayedScene;
