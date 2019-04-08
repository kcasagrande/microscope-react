const Tone = require('Tone/Tone');
const PlayedScene = require('Scene/PlayedScene');
const uuid = require('uuid/v4');
require('helper/ImmutableArray')();
const NoSceneWithId = require('Scene/NoSceneWithId');
const ImmutableObject = require('helper/ImmutableObject');

class Event {
	constructor({
		id = uuid(),
		title = '',
		tone = Tone.Light,
		scenes = []
	} = {}) {
		ImmutableObject.defineProperty(this)('id', id);
		ImmutableObject.defineProperty(this)('title', title);
		ImmutableObject.defineProperty(this)('tone', tone);
		ImmutableObject.defineProperty(this)('scenes', scenes);
	}

	setTitle(title) {
		return new Event({
			id: this.id,
			title: title,
			tone: this.tone,
			scenes: this.scenes
		});
	}

	setToneAsLight() {
		return new Event({
			id: this.id,
			title: this.title,
			tone: Tone.Light,
			scenes: this.scenes
		});
	}

	setToneAsDark() {
		return new Event({
			id: this.id,
			title: this.title,
			tone: Tone.Dark,
			scenes: this.scenes
		});
	}

	addScene({
		scene = new PlayedScene(),
		before = undefined
	} = {}) {
		if(before) {
			try {
				return new Event({
					id: this.id,
					title: this.title,
					tone: this.tone,
					scenes: this.scenes.insertBefore(((scene) => scene.id === before), [scene])
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
			return new Event({
				id: this.id,
				title: this.title,
				tone: this.tone,
				scenes: this.scenes.concat([scene])
			});
		}
	}

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			tone: this.tone.toJSON(),
			scenes: this.scenes.map((scene) => scene.toJSON())
		};
	}

	static fromJSON(json) {
		return new Event({
			id: json.id,
			title: json.title,
			tone: Tone.fromJSON(json.tone),
			scenes: json.scenes.map(PlayedScene.fromJSON)
		});
	}

}

module.exports = Event;
