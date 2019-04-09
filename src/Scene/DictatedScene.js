const Scene = require('Scene/Scene');
const Tone = require('Tone/Tone');
const uuid = require('uuid/v4');

class DictatedScene extends Scene {
	constructor({
		id = uuid(),
		question = '',
		answer = '',
		tone = Tone.Light
	} = {}) {
		super({
			id: id,
			question: question,
			answer: answer,
			tone: tone
		});
	}

	setQuestion(question = '') {
		return new DictatedScene({
			id: this.id,
			question: question,
			answer: this.answer,
			tone: this.tone
		});
	}

	setAnswer(answer = '') {
		return new DictatedScene({
			id: this.id,
			question: this.question,
			answer: answer,
			tone: this.tone
		});
	}

	setToneAsLight() {
		return new DictatedScene({
			id: this.id,
			question: this.question,
			answer: this.answer,
			tone: Tone.Light
		});
	}

	setToneAsDark() {
		return new DictatedScene({
			id: this.id,
			question: this.question,
			answer: this.answer,
			tone: Tone.Dark
		});
	}
}

module.exports = DictatedScene;
