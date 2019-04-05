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

});
