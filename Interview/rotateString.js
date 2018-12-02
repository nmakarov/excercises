// run like so:
// mocha -R spec Interview/rotateString.js

// well the whole thing in this excercise is about coersion, so be carefull.

var assert = require('assert');
var expect = require('chai').expect;

describe ('Rotate string', function () {
	it('Using recursive generator and string functions', function () {
		function *rotateStringRight(s, i = 0, n = s.length) {
			i<n && (yield *rotateStringRight(s.substr(1) + s.charAt(0), ++i)), yield s;
		}
		expect(Array.from(rotateStringRight('12345')))
			.to.have.members([ '12345', '51234', '45123', '34512', '23451' ]);
	});

	it('Using recursive generator and string functions explaned', function () {
		function *rotateStringRight(s, i = 0, n = s.length) {
			const oneRotation = s.substr(1) + s.charAt(0);
			if (i<n) {
				yield *rotateStringRight(oneRotation, ++i);
			}
			yield s;
		}
		expect(Array.from(rotateStringRight('12345')))
			.to.have.members([ '12345', '51234', '45123', '34512', '23451' ]);
	});

	it('Using recursive generator and spread', function () {
		function *rotateStringRight([h, ...t], i = 0, n = t.length) {
			i<n && (yield *rotateStringRight([...t, h], ++i)), yield [...t, h].join('');
		}
		expect(Array.from(rotateStringRight('12345')))
			.to.have.members([ '12345', '51234', '45123', '34512', '23451' ]);
	});
});

