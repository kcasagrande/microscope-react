const should = require('chai').should();
const PlayedScene = require('Scene/PlayedScene');
const Tone = require('Tone/Tone');

describe('PlayedScene', function() {

	context('setQuestion', function() {

		it('should set the question of the PlayedScene to the given question', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setQuestion('New question');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'New question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('requireCharacter', function() {

		it('should have the required character after requiring a character on a PlayedScene where there was none', function() {
			const character = 'First character';
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: [],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.requireCharacter(character);
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: [character],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should have both required characters after requiring a character on a PlayedScene where there was one', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: [character1],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.requireCharacter(character2);
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: [character1, character2],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should throw when thying to require a character on a Scene where there was already two', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const character3 = 'Third character';
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: [character1, character2],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			(() => scene.requireCharacter(character3)).should.throw('Can\'t have more than two required characters');
		});

	});

	context('freeCharacter', function() {

		it('should remove the freed character from the required characters when it was required on the PlayedScene', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['First required character', 'Second required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.freeCharacter('First required character');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Second required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should leave the required characters when the freed character was not required on the PlayedScene', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: [character1, character2],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.freeCharacter('Third character');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: [character1, character2],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('banCharacter', function() {

		it('should have the banned character when there was none in the PlayedScene', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: [],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.banCharacter('Banned character');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should have the banned character when there was already one in the PlayedScene', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['First banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.banCharacter('Second banned character');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['First banned character', 'Second banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should throw when there was already two banned characters in the PlayedScene', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['First banned character', 'Second banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			(() => scene.banCharacter('Third banned character')).should.throw('Can\'t have more than two banned characters');
		});

	});

	context('allowCharacter', function() {

		it('should remove the allowed character from the banned characters when it was banned on the PlayedScene', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['First banned character', 'Second banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.allowCharacter('First banned character');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Second banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('setStage', function() {

		it('should setup the stage of a PlayedScene when there was none', function() {
			const scene = new PlayedScene({
				question: 'Question',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setStage('Stage description');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage description',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should setup the stage of a PlayedScene when there was already one', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Old stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setStage('Stage description');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage description',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('setAnswer', function() {

		it('should set the answer to the question of a PlayedScene when there was none', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				tone: Tone.Light
			});
			const result = scene.setAnswer('Answer');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

		it('should set the answer to the question of a PlayedScene when there was already one', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setAnswer('New answer');
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'New answer',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsLight', function() {

		it('should set the tone to Light', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Dark
			});
			const result = scene.setToneAsLight();
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsDark', function() {

		it('should set the tone to Dark', function() {
			const scene = new PlayedScene({
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.setToneAsDark();
			result.should.deep.equal(new PlayedScene({
				id: scene.id,
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Required character'],
				bannedCharacters: ['Banned character'],
				answer: 'Answer',
				tone: Tone.Dark
			}));
		});

	});

	context('toJSON', function() {

		it('should format to a correct JSON', function() {
			const scene = new PlayedScene({
				id: 'id',
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['First required character', 'Second required character'],
				bannedCharacters: ['First banned character', 'Second banned character'],
				answer: 'Answer',
				tone: Tone.Light
			});
			const result = scene.toJSON();
			result.should.deep.equal({
				id: 'id',
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['First required character', 'Second required character'],
				bannedCharacters: ['First banned character', 'Second banned character'],
				answer: 'Answer',
				tone: Tone.Light.toJSON()
			});
		});

	});

	context('fromJSON', function() {

		it('should parse a correct JSON', function() {
			const scene = PlayedScene.fromJSON({
				id: 'id',
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Character 1', 'Character 2'],
				bannedCharacters: ['Character 3', 'Character 4'],
				answer: 'Answer',
				tone: 'Light'
			});
			scene.should.deep.equal(new PlayedScene({
				id: 'id',
				question: 'Question',
				stage: 'Stage',
				requiredCharacters: ['Character 1', 'Character 2'],
				bannedCharacters: ['Character 3', 'Character 4'],
				answer: 'Answer',
				tone: Tone.Light
			}));
		});

	});

});
