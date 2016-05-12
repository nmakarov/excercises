var assert = require('assert');
var expect = require('chai').expect;

describe ("various tasks", function () {
	it("task: Palindrome", function () {
		var isPalindrome = function (s) {
			var tmp = s.toLowerCase().replace(/\W/g, '');
			return tmp == tmp.split('').reverse().join('');
		};

		assert.equal(isPalindrome('abcba'), true);
		assert.equal(isPalindrome('abcbaa'), false);
		assert.equal(isPalindrome('A bc, ded. C ba.'), true);
	});

	it("task: Summary", function () {
		var summary = function (orig) {
			var inner = function (val) {
				return summary( (+val || 0) + (+orig || 0) );
			};
			inner.valueOf = function () {return +orig || 0;};

			return inner;
		};

		assert.equal(summary(1)(3), 4);
		assert.equal(summary(1)(3)(5), 9);
		assert.equal(summary(1)(-4)(5), 2);
		assert.equal(summary(2), 2);
	});

	it("fun with arrays", function () {
		var a1 = 'abc'.split('');
		var a2 = a1.reverse(''); // <--- gotcha

		assert.equal(a1, a2); // these two arrays are exactly the same (a2 points to a1)
	});

	it("fun with logics", function () {
		assert.equal(1 || 2, 1);
		assert.equal(0 || 2, 2);
		assert.equal(1 && 2, 2);
		assert.equal(0 && 2, 0);
	});

	it("fun with object keys", function () {
		var outer = {};
		var inner = {key: 'value'};
		outer[inner] = 'c';

		assert.equal(outer[inner], 'c');
		assert.equal(Object.keys(outer)[0], '[object Object]');
	});

	it("fun with arrays 2", function () {
		var a1 = [1,3,5]; // 1. memory is allocated and 2. a1 points to that chunk
		var a2 = a1;      // a2 no points to the same chunk
		a1 = [];          // 1. another memory chunk is allocated and 2. a1 now points to this new chunk
		                  // a2 still points to the chunk where a1 used to be pointed to

		assert(a2.length, 3); // see that a2 still have 3 elements in it
		assert(a2[1], 3);
	});

	it("splice vs. slice", function () {
		// splice adds/removes elements and returns removed ones (if any)
		var object, removed, selected;

		object = ['a', 'b', 'c', 'd', 'e'];
		removed = object.splice(1); // remove all elements starting from `1`
		expect(object).to.be.deep.equal(['a']);
		expect(removed).to.be.deep.equal(['b', 'c', 'd', 'e']);

		object = ['a', 'b', 'c', 'd', 'e'];
		removed = object.splice(1,3); // remove 3 elements starting from `1`
		expect(object).to.be.deep.equal(['a', 'e']);
		expect(removed).to.be.deep.equal(['b', 'c', 'd']);

		object = ['a', 'b', 'c', 'd', 'e'];
		removed = object.splice(1,3, 'z'); // replace 3 elements starting from `1` with `z`
		expect(object).to.be.deep.equal(['a', 'z', 'e']);
		expect(removed).to.be.deep.equal(['b', 'c', 'd']);

		object = ['a', 'b', 'c', 'd', 'e'];
		removed = object.splice(2, 0, 'z'); // insert `x` after `b`, nothing is removed
		expect(object).to.be.deep.equal(['a', 'b', 'z', 'c', 'd', 'e']);
		expect(removed).to.be.deep.equal([]);

		object = ['a', 'b', 'c', 'd', 'e'];
		removed = object.splice(-2); // remove two last elements
		expect(object).to.be.deep.equal(['a', 'b', 'c']);
		expect(removed).to.be.deep.equal(['d', 'e']);



		// slice selects a range from the array

		object = ['a', 'b', 'c', 'd', 'e'];
		selected = object.slice(2, 4); // get elements (two) between these two indexes
		expect(object).to.be.deep.equal(['a', 'b', 'c', 'd', 'e']); // original array is unchanged
		expect(selected).to.be.deep.equal(['c', 'd']);

	});

});
