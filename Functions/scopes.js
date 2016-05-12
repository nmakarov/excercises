var assert = require('assert');

describe ("Scope tests", function () {
	it("Declared variable - wrong assumption", function () {
		(function () {
			var x = y = 1; // `y` is global, only `x` is local
		})();

		assert.equal(typeof x === 'undefined', true);
		assert.equal(typeof y === 'undefined', false);
	});

	it("`this` for the constructed object", function () {
		this.value = 'this.value';
		var outer = {
			value: 'outer value',
			inner: {
				value: 'inner value',
				getValue: function () {
					return this.value;
				}
			}
		};

		assert.equal(outer.inner.getValue(), 'inner value');
		var fn = outer.inner.getValue;
		assert.equal(fn.apply(outer, []), 'outer value');
		assert.equal(fn.apply(this, []), 'this.value');
	});
});