const ImmutableObject = {
	defineProperty: (target) => (name, value) => Object.defineProperty(
		target,
		name,
		{
			configurable: false,
			writeable: false,
			enumerable: true,
			value: value
		}
	),

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
