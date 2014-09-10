/**
 * Here goes the PRIME NUMBERS!
 */

var assert = require('assert');

describe('Testing Prime Functions', function () {
	it('should work', function () {
		var isPrime = function (n) {
			for (var divider = 2, max = Math.sqrt(n); divider < max; divider++) {
				if ( n % divider === 0) {
					return false;
				}
			}
			return true;
		};

		assert.equal(isPrime(7), true);
		assert.equal(isPrime(8), false);
	});
});
