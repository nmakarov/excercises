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
		var thunk = function (f, lst) {
			return {tag: "thunk", func: f, args: lst};
		};
		var identity = function (x) {
			return {tag: "value", val: x};
		};
		var factorial = function (n, cont) {
			if (n < 2) {
				return thunk(cont, [n]);
			} else {
				var new_cont = function (v) {
					var result = v * n;
					return thunk(cont, [result]);
				};
				return thunk(factorial, [n-1, new_cont]);
			}
		};

		var trampoline = function (thk) {
			while (true) {
				if (thk.tag === "value") {
					return thk.val;
				} else {
					thk = thk.func.apply(null, thk.args);
				}
			}
		}

		expect(trampoline(factorial(5, identity))).to.be.equal(120);

	});
});

