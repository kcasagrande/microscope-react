const Tone = require('Tone/Tone');
const uuid = require('uuid/v4');
const ImmutableObject = require('helper/ImmutableObject');

class Scene {
	constructor({
		id = uuid(),
		question = '',
		answer = '',
		tone = Tone.Light
	} = {}) {
		ImmutableObject.defineProperty(this)('id', id);
		ImmutableObject.defineProperty(this)('question', question);
		ImmutableObject.defineProperty(this)('answer', answer);
		ImmutableObject.defineProperty(this)('tone', tone);
	}

	setQuestion(question) {
		return new Scene({
			id: this.id,
			question: question,
			answer: this.answer,
			tone: this.tone
		});
	}

	setAnswer(answer) {
		return new Scene({
			id: this.id,
			question: this.question,
			answer: answer,
			tone: this.tone
		});
	}

	setToneAsLight() {
		return new Scene({
			id: this.id,
			question: this.question,
			answer: this.answer,
			tone: Tone.Light
		});
	}

	setToneAsDark() {
		return new Scene({
			id: this.id,
			question: this.question,
			answer: this.answer,
			tone: Tone.Dark
		});
	}

	toJSON() {
		return Object.freeze({
			id: id,
			question: question,
			answer: answer,
			tone: tone.toJSON()
		});
	}

}

module.exports = Scene;
