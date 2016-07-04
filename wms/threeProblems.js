var assert = require('assert');
var expect = require('chai').expect;


var nthFib = function () {
	var cache = {};
	return function (nth) {
		return cache[nth] || (cache[nth] = _nthFib(nth));
	};
}();

var _nthFib = function (n) {
	return n === 0 ? 0 :
		   n === 1 ? 1 :
		   nthFib(n-1) + nthFib(n-2);
};



var add = function (orig) {
	var inner = function (val) {
		return add( (+val || 0) + (+orig || 0) );
	};
	inner.valueOf = function () {return +orig || 0;};

	return inner;
};

var add5 = function (number) {
	return add(5)(number);
};


var arrayDoubler = function (arr) {
	return arr.map(function (n) {
		return n*2;
	});
};


describe ('Q1', function () {
	it('nth fib', function () {
		assert.equal(nthFib(0), 0);
		assert.equal(nthFib(1), 1);
		assert.equal(nthFib(2), 1);
		assert.equal(nthFib(3), 2);
		assert.equal(nthFib(4), 3);
	});
});


describe ('Q2', function () {
	it('Partially applied', function () {
		assert.equal(add(2)(0)(3), 5);
		assert.equal(add5(3), 8);
	});
});

describe ('Q3', function () {
	it('Array x 2', function () {
		expect(arrayDoubler([2,3,4])).to.have.members([4,6,8]);
	});
});

