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
		bannedCharacters = [],
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
		ImmutableObject.defineProperty(this)('bannedCharacters', bannedCharacters);
	}

	setQuestion(question) {
		return new PlayedScene({
			id: this.id,
			question: question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters,
			bannedCharacters: this.bannedCharacters,
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
				bannedCharacters: this.bannedCharacters,
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
			bannedCharacters: this.bannedCharacters,
			answer: this.answer,
			tone: this.tone
		});
	}

	banCharacter(bannedCharacter) {
		if(this.bannedCharacters.length < 2) {
			return new PlayedScene({
				id: this.id,
				question: this.question,
				stage: this.stage,
				requiredCharacters: this.requiredCharacters,
				bannedCharacters: this.bannedCharacters.concat([bannedCharacter]),
				answer: this.answer,
				tone: this.tone
			});
		}
		else {
			throw Error('Can\'t have more than two banned characters');
		}
	}

	allowCharacter(allowedCharacter) {
		return new PlayedScene({
			id: this.id,
			question: this.question,
			stage: this.stage,
			requiredCharacters: this.requiredCharacters,
			bannedCharacters: this.bannedCharacters.filter((character) => character !== allowedCharacter),
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
			bannedCharacters: this.bannedCharacters,
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
			bannedCharacters: this.bannedCharacters,
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
			bannedCharacters: this.bannedCharacters,
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
			bannedCharacters: this.bannedCharacters,
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
			bannedCharacters: this.bannedCharacters,
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
			bannedCharacters: json.bannedCharacters.slice(),
			answer: json.answer,
			tone: Tone.fromJSON(json.tone)
		});
	}
}


module.exports = PlayedScene;
