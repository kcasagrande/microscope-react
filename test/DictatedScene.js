require('chai').should();
const Tone = require('Tone/Tone');
const DictatedScene = require('Scene/DictatedScene');

describe('DictatedScene', function() {

	context('setQuestion', function() {

		it('should set the question when there was none', function() {
			const scene = new DictatedScene({
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setQuestion('New question');
			result.should.deep.equal(new DictatedScene({
				id: scene.id,
				question: 'New question',
				answer: scene.answer,
				tone: scene.tone
			}));
		});

		it('should set the question when there was already one', function() {
			const scene = new DictatedScene({
				question: 'Question',
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setQuestion('New question');
			result.should.deep.equal(new DictatedScene({
				id: scene.id,
				question: 'New question',
				answer: scene.answer,
				tone: scene.tone
			}));
		});

	});

	context('setAnswer', function() {

		it('should set the answer when there was none', function() {
			const scene = new DictatedScene({
				question: 'Question',
				tone: Tone.Light
			});
			const result = scene.setAnswer('New answer');
			result.should.deep.equal(new DictatedScene({
				id: scene.id,
				question: scene.question,
				answer: 'New answer',
				tone: scene.tone
			}));
		});

		it('should set the answer when there was already one', function() {
			const scene = new DictatedScene({
				question: 'Question',
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setAnswer('New answer');
			result.should.deep.equal(new DictatedScene({
				id: scene.id,
				question: scene.question,
				answer: 'New answer',
				tone: scene.tone
			}));
		});

	});

	context('setToneAsLight', function() {

		it('should set the tone to Light', function() {
			const scene = new DictatedScene({
				question: 'Question',
				answer: 'Answer',
				tone: Tone.Dark
			});
			const result = scene.setToneAsLight();
			result.should.deep.equal(new DictatedScene({
				id: scene.id,
				question: scene.question,
				answer: scene.answer,
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsDark', function() {

		it('should set the tone to Dark', function() {
			const scene = new DictatedScene({
				question: 'Question',
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setToneAsDark();
			result.should.deep.equal(new DictatedScene({
				id: scene.id,
				question: scene.question,
				answer: scene.answer,
				tone: Tone.Dark
			}));
		});

	});

});
