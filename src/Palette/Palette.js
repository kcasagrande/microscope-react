const ImmutableObject = require('helper/ImmutableObject');

class Palette {
	constructor({
		yes = [],
		no = []
	} = {}) {
		ImmutableObject.defineProperty(this)('yes', yes);
		ImmutableObject.defineProperty(this)('no', no);
	}

	addYesIngredient(ingredient) {
		return new Palette({
			yes: this.yes.concat([ingredient]),
			no: this.no.slice()
		});
	}

}

module.exports = Palette;
