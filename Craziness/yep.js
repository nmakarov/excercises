
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

describe ('Crazy take #1', function () {
	it('{} + [] === ?', function () {
		assert({} + [] !== false);
		assert({} + [] !== true);
	});

	it('[] + 12', function () {
		assert([] + 12 === "12");
		assert.equal(typeof ([] + 12), 'string');
	});

	it('{} + 12', function () {
		assert({} + 12 !== "12");
	});

	it ('new Boolean(false) === ?', function () {
		var b = new Boolean(false);
		assert.equal(b.valueOf(), false);
		assert.equal(b.toString(), "false");

		// now, let's use it. It doesn't evaluate to false!!!
		assert(b ? 'true' : 'false' !== 'false');
	});

	it('integers, anyone?', function () {
		var a = 0;
		var b = new Number(0);
		assert.equal(a == b, true);
		assert.equal(!!a == !!b, false); // this is crazy!
		assert.equal(!!a, false);
		assert.equal(!!b, true);
	});

	it('converts anything to a string...', function () {
		assert.equal('' + false, 'false');
	});
	it('  ...or a number', function () {
		assert.equal(true + true, 2);
		assert.equal(true << true, 2);
	});

	it('coersion madness', function () {
		assert.equal( []  === 0, false); // yep, expected, right?
		assert.equal(+[]  === 0, true);  // wow
		assert.equal(+[8] === 8, true);  // wow
		assert.equal(+[[[8]]] === 8, true);  // wow
	});

	it('valueOf crap', function () {
		var valueOfCalled = false;
		var O = function () {this.valueOf = function () {valueOfCalled = true; return false;};};
		var o = new O();

		// initially, no coersion happened:
		assert.equal(valueOfCalled, false);


		// numeric coescion happens:
		assert.equal(+o, false);
		assert.equal(valueOfCalled, true);
		valueOfCalled = false; // reset the flag

		// and now no coersion!
		assert.equal(!!o, true);
		assert.equal(valueOfCalled, false);

		// in other words,
		assert.equal(!!o !== +0, true);
	});

	it('the whole thing about reliably identify the type of some variable', function () {
		// just a stub here,
		// explore instanceof, typeof, variable.constructor etc. Be careful with null/undefined.
		// also see Functions/integers.js as well.
	});

	it('Array as a hash? Hell yeah', function () {
		var a = ['a','b','c','d','e'];
		assert.equal('3' in a, true);
		// why?
		// 1. `in` looks for a specific key in hash, so array coerces to hash, indexes become keys.
		// 2. `3` - string, object keys are strings, so the fourth element is easily found.
		var f = false;
		for (var k in a) {
			if (k === '3') {
				f = true;
			}
		}
		assert.equal(f, true);
	});

	it('arguments craziness', function () {
		var f1 = function (p1, p2) {
			return p2;
		};

		assert.equal(f1(3,4), 4);
		assert.equal(typeof f1(3), 'undefined');

		var f2 = function (p1, p2) {
			arguments[1] = p1;
			return p2;
		};

		assert.equal(f2(3,4), 3);
		assert.equal(typeof f2(3), 'undefined');

		var f3 = function (p1, p2) {
			 p2 = p1;
			return arguments[1];
		};

		assert.equal(f3(3,4), 3);
		assert.equal(typeof f3(3), 'undefined');

		// why? if called as `f2('a', 'b')`, both parameters goes into array-like arguments thing 
		// and pointers to that assigned to p1 and p2 respectively. In other words manipulation 
		// with `p2` or `arguments[1]` affects the same memory area.
		// And if called as `f2('a')`, memory area for the second parameter is not allocated; 
		// `arguments[1]` does not exist. `arguments[1]` and p2 are not connected.

	});

});

describe ('Crazy take #2', function () {
	it('false', function () {
		assert((![]+[]), "false");

		expect(!![]+[]).to.equal("true");
		expect(!![]+[]).not.to.equal(true);
	});

	it ("0/1/many", function () {
		expect([]|[]).to.equal(0);
		expect(-~[]).to.equal(1);
		expect(-~-~[]).to.equal(2);
		expect(-~-~-~[]).to.equal(3);
		expect(-~-~-~-~[]).to.equal(4);
		expect(-~-~-~-~[]*-~-~-~[]).to.equal(12);
	});

	it ("undefined", function () {
		expect([][[]]).to.be.equal(undefined);
	});


// _=[][(![]+[])[(-~[])+(-~[])+(-~[])]+([]+{})[(-~[])]+(!(![])+[])[(-~[])]+(!(![])+[])[([]|[])]];
// _=_();
// _[(![]+[])[(-~[])]+(![]+[])[(-~[])+(-~[])]+(![]+[])[(-~[])+(-~[])+(-~[])+(-~[])]+(!(![])+[])[(-~[])]+(!(![])+[])[([]|[])]](([]+{})[(-~[])+(-~[])+(-~[])+(-~[])+(-~[])]+([]+{})[(-~[])]+([]+{})[(-~[])]+(![]+[])[(-~[])+(-~[])]);

/*

_=[][ (![] + []) [ (-~[]) + (-~[]) + (-~[]) ] +
	([]+{}) [(-~[])] +
	(!(![])+[]) [(-~[])] +
	( ! (![]) + []) [ ([]|[]) ]
];


*/

// 1) _=[][«sort»] — сохраняем в переменную ссылку на метод sort массив
// 2) _=_(); — выполняем метод sort, получаем ссылку на объект Window
// 3) _['alert']('cool') — используя в объекте Window ссылку на метод alert выполняем его с аргументом 'cool'

// https://habrahabr.ru/post/112530/

});

describe ("Crazy take #3", function () {
	it("Indirect method", function () {
		var o = {};
		o.left = function () {return 'l'};
		o.right = function () {return 'r'};
		var ok = true;
		var res = o[ok ? 'left' : 'right']();
		expect(res).to.equal('l');
	});
});

describe ("Crazy take #4", function () {
	it("Ok, what about regexes?", function () {
		expect(/^[a-z]+$/.test('abc')).to.equal(true);
		expect(/^[a-z]+$/.test('123')).to.equal(false);

		expect(/^[a-z]+$/.test(null)).to.equal(true); // WTF?!
	});

	it("Oh, my", function () {
		expect(parseInt(null, 24)).to.equal(23); // well, `n` is 14th charachter, and on top of 0-9 that makes it 23th.
		expect(parseInt(false, 16)).to.equal(250); // because 0xFA === 250
	});

	it("math", function () {
		expect(true+true).to.equal(2); // true coherce to 1
	});

	it("arrays", function () {
		expect([] != true).to.be.true;
		expect([1] == true).to.be.true;
		expect([2] != true).to.be.true;
		expect([true] != true).to.be.true;
	});

	it("triple comparison", function () {
		// broken:
		expect(3>2>1).not.to.be.true;
		// let's fix it:
		expect(3>2>=1).to.be.true;
	});

	it("fixed", function () {
		expect(44..toFixed(2)).to.equal("44.00");
	});

	it("nans", function () {
		expect(typeof NaN).to.equal('number');
		expect(isNaN(null)).to.be.false;
		expect(+null).to.equal(0);
	});

	it("comma operator", function () {
		expect([0,1,2][0,1,2]).to.equal(2);
	});

	it("constructors", function () {
		expect('a'.constructor.constructor("return 5")()).to.equal(5);
	});

	it("templating", function () {
		var replacements = {
			str1: 'first',
			str5: 'fifth',
		};
		var text = "Strings {str1} and {str5} and again {str1}";
		Object.keys(replacements).forEach(function (k) {
			text = text.split('{' + k + '}').join(replacements[k])
		});
		expect(text).to.equal('Strings first and fifth and again first');
	});
});

describe ("NaN, anyone?", function () {
	it("when x !== x ?", function () {
		var x = 5;
		expect(x !== x, false, "obvious, isn't it");
		x = NaN;
		expect(x !== x, true, "what?!");
	});
});

describe ("null – what is it", function () {
	it("is an object?", function () {
		var a = null;
		expect (typeof a, "object");
	});

	it("is not an object?", function () {
		var a = null;
		try {
			Object.keys(a);
		} catch (err) {
			expect ( err ).to.be.an.instanceof ( TypeError ); // what?!
		}
	});
});

describe("fun with parseInt", () => {
	it("what?", () => {
		const arr = [1, 2, 11].map(parseInt);
		expect(arr[0]).to.eq(1);
		expect(arr[1]).to.be.NaN;
		expect(arr[2]).to.eq(3);
	});

	it("well...", () => {
		const arr = [1, 2, 11].map((value, index, array) => parseInt(value, index, array));
		// so, here are the params of each of the three iterations:
		// 1. 1, 0, [1, 2, 11] --> parseInt of 1 by radix 0 == 1, ok
		// 2. 2, 1, [1, 2, 11] --> parseInt of 2 by radix 1 == NaN since 2 is not valid in that radix
		// 3. 11, 2, [1, 2, 11] --> parseInt of 11 by radix 2 == 3 since binary 11 means 1*(2*0) + 1*(2*1) == 3 by radix 10
		expect(arr[0]).to.eq(1);
		expect(arr[1]).to.be.NaN;
		expect(arr[2]).to.eq(3);
	});
});
