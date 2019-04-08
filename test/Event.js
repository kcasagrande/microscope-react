const should = require('chai').should();
const Event = require('Event/Event');
const Scene = require('Scene/Scene');
const Tone = require('Tone/Tone');
const uuid = require('uuid/v4');
const NoSceneWithId = require('Scene/NoSceneWithId');

describe('Event', function() {

	context('setTitle', function() {

		it('should set the title of the Event to the given one when there was none', function() {
			const event = Event()({
				tone: Tone.Light
			});
			const result = event.setTitle('Title');
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Light
			}));
		});

		it('should set the title of the Event to the given one when there was already one', function() {
			const event = Event()({
				title: 'Title',
				tone: Tone.Light
			});
			const result = event.setTitle('New title');
			result.should.deep.equal(Event(event.id)({
				title: 'New title',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsLight', function() {

		it('should set the tone to Light', function() {
			const event = Event()({
				title: 'Title',
				tone: Tone.Dark
			});
			const result = event.setToneAsLight();
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Light
			}));
		});

	});

	context('setToneAsDark', function() {

		it('should set the tone to Dark', function() {
			const event = Event()({
				title: 'Title',
				tone: Tone.Light
			});
			const result = event.setToneAsDark();
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Dark
			}));
		});

	});

	context('addScene', function() {

		it('should add a Scene when there were none', function() {
			const event = Event()({
				title: 'Title',
				tone: Tone.Light
			});
			const scene = Scene()();
			const result = event.addScene({
				scene: scene
			});
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Light,
				scenes: [scene]
			}));
		});

		it('should append a Scene when there was already one', function() {
			const scene = Scene()();
			const event = Event()({
				title: 'Title',
				tone: Tone.Light,
				scenes: [scene]
			});
			const newScene = Scene()();
			const result = event.addScene({
				scene: newScene
			});
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Light,
				scenes: [scene, newScene]
			}));
		});

		it('should insert a Scene before the one with the specified ID when there is a corresponding one', function() {
			const scene1 = Scene()();
			const scene2 = Scene()();
			const scene3 = Scene()();
			const event = Event()({
				title: 'Title',
				tone: Tone.Light,
				scenes: [scene1, scene2, scene3]
			});
			const newScene = Scene()();
			const result = event.addScene({
				scene: newScene,
				before: scene2.id
			});
			result.should.deep.equal(Event(event.id)({
				title: 'Title',
				tone: Tone.Light,
				scenes: [scene1, newScene, scene2, scene3]
			}));
		});

		it('should throw when adding a Scene before the one with the specified ID when there is no corresponding one', function() {
			const scene1 = Scene()();
			const scene2 = Scene()();
			const scene3 = Scene()();
			const sceneId = uuid();
			const event = Event()({
				title: 'Title',
				tone: Tone.Light,
				scenes: [scene1, scene2, scene3]
			});
			const newScene = Scene()();
			(() => event.addScene({
				scene: newScene,
				before: sceneId
			})).should.throw(NoSceneWithId, 'No Scene with ID ' + sceneId);
		});

	});

	describe('fromJSON', function() {

		it('should format to a correct JSON', function() {
			const event = Event.fromJSON({
				id: 'id',
				title: 'Title',
				tone: 'Light'
			});
			event.should.deep.equal(Event('id')({
				title: 'Title',
				tone: Tone.Light
			}));
		});

	});

});
