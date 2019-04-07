const light = Symbol.for('Light');
const dark = Symbol.for('Dark');

const Tone = (value) => {
	const tone = {};
	
	const def = require('helper/ImmutableObject').defineMethod(tone);

	def('toggle', () => {
		if(value === light) {
			return Tone.Dark;
		}
		else {
			return Tone.Light;
		}
	});

	return Object.freeze(tone);
}

Tone.Light = Tone(light);
Tone.Dark = Tone(dark);

module.exports = {
	Light: Tone.Light,
	Dark: Tone.Dark,

	fromJSON: (json) => {
		switch(json) {
			case 'Light':
				return Tone.Light;
				break;
			default:
				return Tone.Dark;
		}
	}
};
