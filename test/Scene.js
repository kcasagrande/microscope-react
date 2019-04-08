const should = require('chai').should();
const Scene = require('Scene/Scene');
const Tone = require('Tone/Tone');

describe('Scene', function() {

	context('setQuestion', function() {

		it('should set the question of the Scene to the given question', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setQuestion('New question');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'New question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('requireCharacter', function() {

		it('should have the required character after requiring a character on a Scene where there was none', function() {
			const character = 'First character';
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: [],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.requireCharacter(character);
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: [character],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should have both required characters after requiring a character on a Scene where there was one', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: [character1],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.requireCharacter(character2);
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: [character1, character2],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should throw when thying to require a character on a Scene where there was already two', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const character3 = 'Third character';
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: [character1, character2],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			(() => scene.requireCharacter(character3)).should.throw('Can\'t have more than two required characters');
		});

	});

	context('freeCharacter', function() {

		it('should remove the freed character from the required characters when it was required on the Scene', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['First required character', 'Second required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.freeCharacter('First required character');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Second required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should leave the required characters when the freed character was not required on the Scene', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: [character1, character2],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.freeCharacter('Third character');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: [character1, character2],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('forbidCharacter', function() {

		it('should have the forbidden character when there was none in the Scene', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: [],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.forbidCharacter('Forbidden character');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should have the forbidden character when there was already one in the Scene', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['First forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.forbidCharacter('Second forbidden character');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['First forbidden character', 'Second forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should throw when there was already two forbidden characters in the Scene', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['First forbidden character', 'Second forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			(() => scene.forbidCharacter('Third forbidden character')).should.throw('Can\'t have more than two forbidden characters');
		});

	});

	context('allowCharacter', function() {

		it('should remove the allowed character from the forbidden characters when it was forbidden on the Scene', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['First forbidden character', 'Second forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.allowCharacter('First forbidden character');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Second forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('setupFrame', function() {

		it('should setup the frame of a Scene when there was none', function() {
			const scene = Scene({
				question: 'Question',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setupFrame('Frame description');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame description',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should setup the frame of a Scene when there was already one', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Old frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setupFrame('Frame description');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame description',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('setAnswer', function() {

		it('should set the answer to the question of a Scene when there was none', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				tone: Tone.Light
			});
			const result = scene.setAnswer('Answer');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should set the answer to the question of a Scene when there was already one', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setAnswer('New answer');
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'New answer',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsLight', function() {

		it('should set the tone to Light', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Dark
			});
			const result = scene.setToneAsLight();
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsDark', function() {

		it('should set the tone to Dark', function() {
			const scene = Scene({
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setToneAsDark();
			result.should.deep.equal(Scene({
				id: scene.id,
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Required character'],
				forbiddenCharacters: ['Forbidden character'],
				answer: 'Answer',
				tone: Tone.Dark
			}));
		});

	});

	context('toJSON', function() {

		it('should format to a correct JSON', function() {
			const scene = Scene({
				id: 'id',
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['First required character', 'Second required character'],
				forbiddenCharacters: ['First forbidden character', 'Second forbidden character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.toJSON();
			result.should.deep.equal({
				id: 'id',
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['First required character', 'Second required character'],
				forbiddenCharacters: ['First forbidden character', 'Second forbidden character'],
				answer: 'Answer',
				tone: Tone.Light.toJSON()
			});
		});

	});

	context('fromJSON', function() {

		it('should format to a correct JSON', function() {
			const scene = Scene.fromJSON({
				id: 'id',
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Character 1', 'Character 2'],
				forbiddenCharacters: ['Character 3', 'Character 4'],
				answer: 'Answer',
				tone: 'Light'
			});
			scene.should.deep.equal(Scene({
				id: 'id',
				question: 'Question',
				frame: 'Frame',
				requiredCharacters: ['Character 1', 'Character 2'],
				forbiddenCharacters: ['Character 3', 'Character 4'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

});
