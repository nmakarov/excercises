
// run like so:
// mocha -R spec Craziness/yep.js

// ===============================================================================
// HUGE DISCLAIMER AND WARNING:
// Don't be an interview jerk and ask questions like "What does {} + [] returns?".
// That's just mean.
// ===============================================================================

// well the whole thing in this excercise is about coersion, so be carefull.

var assert = require('assert');
var expect = require('chai').expect;

describe("objects", () => {
	it("Object shorthand", () => {
		const a = 2;
		const b = "xyz";
		expect({ a, b }).to.be.deep.equal({ a: a, b: b});
	});

	it("funcs in objects shorthand", () => {
		var obj = {
			func(a, b) {
				return a + b;
			}
		}
		expect(obj.func(3,4)).to.be.equal(7);
	});

	it("have a block scope", () => {
		const a = 123;
		{
			let a = "new value";
			let inner = "inner";
			expect(a).to.be.equal("new value");
			expect(typeof inner).to.be.equal("string");
		}
		expect(a).to.be.equal(123);
		expect(typeof inner).to.be.equal("undefined");
	});
});

describe("classes", () => {
	it("have getters and setters", () => {
		class Account {
			get balance() { return this._balance; }
			set pay(amount) {this._balance = (this._balance || 0) - amount; }
		}

		let a = new Account;
		expect(typeof a.balance).to.be.equal("undefined");
		a.pay = 120;
		a.pay = 40;
		expect(a.balance).to.be.equal(-160);
		a.pay = -3;
		expect(a.balance).to.be.equal(-157);
	});
});

