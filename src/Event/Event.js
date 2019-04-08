const Tone = require('Tone/Tone');
const Scene = require('Scene/Scene');
const uuid = require('uuid/v4');
require('helper/ImmutableArray')();
const NoSceneWithId = require('Scene/NoSceneWithId');

const Event = ({
	id = uuid(),
	title = '',
	tone = Tone.Light,
	scenes = []
}) => {
	const event = {
		id: id,
		title: title,
		tone: tone,
		scenes: scenes
	}

	const def = require('helper/ImmutableObject').defineMethod(event);

	def('setTitle', (title) => {
		return Event({
			id: id,
			title: title,
			tone: tone,
			scenes: scenes
		});
	});

	def('setToneAsLight', () => {
		return Event({
			id: id,
			title: title,
			tone: Tone.Light,
			scenes: scenes
		});
	});

	def('setToneAsDark', () => {
		return Event({
			id: id,
			title: title,
			tone: Tone.Dark,
			scenes: scenes
		});
	});

	def('addScene', ({
		scene = Scene(),
		before = undefined
	} = {}) => {
		if(before) {
			try {
				return Event({
					id: id,
					title: title,
					tone: tone,
					scenes: scenes.insertBefore(((scene) => scene.id === before), [scene])
				});
			}
			catch(error) {
				if(error.message === 'No such element') {
					throw new NoSceneWithId(before);
				}
				else {
					throw error;
				}
			}
		}
		else {
			return Event({
				id: id,
				title: title,
				tone: tone,
				scenes: scenes.concat([scene])
			});
		}
	});

	return Object.freeze(event);
};

Event.fromJSON = (json) => {
	return Event({
		id: json.id,
		title: json.title,
		tone: Tone.fromJSON(json.tone)
	});
};

module.exports = Event;
