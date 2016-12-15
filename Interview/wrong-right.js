var assert = require('assert');
var expect = require('chai').expect;

describe("wrong-right 1", function () {
	it("wrong way", function () {
		var quickChange = function (a, i, j) {
			var tmp = a[i];
			a[i] = a[j];
			a[j] = tmp;
		};

		var a = [0,1,2,3,4,5];
		quickChange(a, 2, 3);
		expect(a).to.be.deep.equal([0,1,3,2,4,5]);
	});
});
