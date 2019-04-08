const ImmutableArray = () => {
	Array.prototype.insertBefore = function(callback, otherArray, thisArg) {
		const beforeIndex = this.findIndex(callback, thisArg);
		if(beforeIndex > 0) {
			return this.slice(0, beforeIndex).concat(otherArray).concat(this.slice(beforeIndex));
		}
		else {
			throw Error('No such element');
		}
	};
};

module.exports = ImmutableArray;
