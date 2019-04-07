const should = require('chai').should();
const assert = require('chai').assert;
const Scene = require('Scene/Scene');

describe('Scene', function() {

	context('setQuestion', function() {

		it('should return a copy of the Scene with the given question', function() {
			const scene = Scene()('First question');
			const otherScene = scene.setQuestion('Second question');
			scene.question.should.equal('First question');
			otherScene.question.should.equal('Second question');
			scene.id.should.equal(otherScene.id);
		});

	});

	context('requireCharacter', function() {

		it('should have the required character after requiring a character on a Scene where there was none', function() {
			const character = 'First character';
			const scene = Scene()('First question').requireCharacter(character);
			assert.deepEqual(scene.requiredCharacters, [character]);
		});

		it('should have both required characters after requiring a character on a Scene where there was one', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const scene = Scene()('First question', [character1]).requireCharacter(character2);
			assert.deepEqual(scene.requiredCharacters, [character1, character2]);
		});

		it('should throw when thying to require a character on a Scene where there was already two', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const character3 = 'Third character';
			const scene = Scene()('First question', [character1, character2]);
			(() => scene.requireCharacter(character3)).should.throw('Can\'t have more than two required characters');
		});

	});

	context('freeCharacter', function() {

		it('should remove the freed character from the required characters when it was required on the Scene', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const character3 = 'Third character';
			const scene = Scene()('First question', [character1, character2, character3]);
			const result = scene.freeCharacter('Second character');
			result.should.deep.equal(Scene(scene.id)('First question', [character1, character3]));
		});

		it('should leave the required characters when the freed character was not required on the Scene', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const scene = Scene()('First question', [character1, character2]);
			const result = scene.freeCharacter('Third character');
			result.should.deep.equal(Scene(scene.id)('First question', [character1, character2]));
		});

	});

	context('forbidCharacter', function() {

		it('should have the forbidden character when there was none in the Scene', function() {
			const scene = Scene()('First question', ['Required character'], []);
			const result = scene.forbidCharacter('Forbidden character');
			result.should.deep.equal(Scene(scene.id)('First question', ['Required character'], ['Forbidden character']));
		});

		it('should have the forbidden character when there was already one in the Scene', function() {
			const scene = Scene()('First question', ['Required character'], ['First forbidden character']);
			const result = scene.forbidCharacter('Second forbidden character');
			result.should.deep.equal(Scene(scene.id)('First question', ['Required character'], ['First forbidden character', 'Second forbidden character']));
		});

		it('should throw when there was already two forbidden characters in the Scene', function() {
			const scene = Scene()('First question', ['Required character'], ['First forbidden character', 'Second forbidden character']);
			(() => scene.forbidCharacter('Third forbidden character')).should.throw('Can\'t have more than two forbidden characters');
		});

	});

	describe('fromJSON', function() {

		it('should format to a correct JSON', function() {
			const scene = Scene.fromJSON({
				id: 'id',
				question: 'What?',
				requiredCharacters: ['Character 1']
			});
			scene.should.deep.equal(Scene('id')('What?', ['Character 1']));
		});

	});

});
