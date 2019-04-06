const ImmutableObject = {
	defineMethod: (target) => (name, method) => Object.defineProperty(
		target,
		name,
		{
			configurable: false,
			writeable: false,
			enumerable: false,
			value: method
		}
	)
};

module.exports = ImmutableObject;
