const should = require('chai').should();
const assert = require('chai').assert;
const Scene = require('Scene/Scene');

describe('Scene', function() {

	context('setQuestion', function() {

		it('should return a new Scene with the given question', function() {
			const scene = Scene('First question');
			const otherScene = scene.setQuestion('Second question');
			scene.question.should.equal('First question');
			otherScene.question.should.equal('Second question');
			scene.id.should.not.equal(otherScene.id);
		});

	});

	context('requireCharacter', function() {

		it('should have the required character after requiring a character on a Scene where there was none', function() {
			const character = 'First character';
			const scene = Scene('First question').requireCharacter(character);
			assert.deepEqual(scene.requiredCharacters, [character]);
		});

		it('should have both required characters after requiring a character on a Scene where there was one', function() {
			const character1 = 'First character';
			const character2 = 'Second character';
			const scene = Scene('First question', [character1]).requireCharacter(character2);
			assert.deepEqual(scene.requiredCharacters, [character1, character2]);
		});

	});

});
