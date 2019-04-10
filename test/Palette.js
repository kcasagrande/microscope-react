require('chai').should();
const Palette = require('Palette/Palette');

describe('Palette', function() {

	context('addYesIngredient', function() {

		it('should add an ingredient to the Yes part when there was none', function() {
			const palette = new Palette({
				no: ['First No ingredient', 'Second No ingredient']
			});
			const result = palette.addYesIngredient('New ingredient');
			result.should.deep.equal(new Palette({
				yes: ['New ingredient'],
				no: palette.no
			}));
		});

		it('should append an ingredient to the Yes part when there were some', function() {
			const palette = new Palette({
				yes: ['First Yes ingredient', 'Second Yes ingredient'],
				no: ['First No ingredient', 'Second No ingredient']
			});
			const result = palette.addYesIngredient('New ingredient');
			result.should.deep.equal(new Palette({
				yes: ['First Yes ingredient', 'Second Yes ingredient', 'New ingredient'],
				no: palette.no
			}));
		});

	});

});
