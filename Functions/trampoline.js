var assert = require('assert');
var expect = require('chai').expect;

describe ("reqursions and trampolines", function () {
	it("recursion", function () {
		var factorial = function (n) {
			return n > 1 ? n * factorial(n-1) : 1;
		}

		expect(factorial(5)).to.be.equal(120);
	});

	it("trampoline", function () {
		var thunk = function (func, args) {
			return {tag: "thunk", func: func, args: args};
		};
		var identity = function (x) {
			return {tag: "value", value: x};
		};
		var trampoline = function (thk) {
			while (true) {
				if (thk.tag === "value") {
					return thk.value;
				} else {
					thk = thk.func.apply(null, thk.args);
				}
			}
		}

		var factorial = function (current, done) {
				return current < 2
					? thunk(done, [current])
					: thunk(factorial, [current-1, function (running) {
						return thunk(done, [running * current]);
					}]);
		};


		expect(trampoline(factorial(5, identity))).to.be.equal(120);

	});
});

