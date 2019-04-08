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

	def('toJSON', () => {
		if(value === light) {
			return 'Light';
		}
		else {
			return 'Dark';
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
		if(json === 'Light') {
			return Tone.Light;
		}
		else {
			return Tone.Dark;
		}
	}
};
