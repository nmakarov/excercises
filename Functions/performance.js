// These tests prove that performance is of no concern for a properly planned apps. JS is quite fast for what it is.

var assert = require('assert');

var iterations = 100000000;

describe ("performance", function () {
	it ("closures", function () {
		var i;
		var v1 = 1;
		var createFunc = function (level) {
			var v2 = 2;
			return function () {
				var v3 = 3;
				if (level === 1) {
					v3 = v3 + 1;
				} else if (level === 2) {
					v3 = v2 + 1;
				} else {
					v3 = v1 + 1;
				}
			};
		};

		var f1 = createFunc(1);
		var f2 = createFunc(2);
		var f3 = createFunc(3);
		console.time('f1'); for (i = iterations; --i;) f1(); console.timeEnd('f1');
		console.time('f2'); for (i = iterations; --i;) f2(); console.timeEnd('f2');
		console.time('f3'); for (i = iterations; --i;) f3(); console.timeEnd('f3');
	});

	it("props in constructor", function () {
		var Obj1 = function () {
			this.p1 = 'some thery long string';
			this.p2 = 'some thery long string';
			this.p3 = 'some thery long string';
			this.p4 = 'some thery long string';
		};

		var Obj2 = function () {};
		Obj2.prototype.p1 = 'some thery long string';
		Obj2.prototype.p2 = 'some thery long string';
		Obj2.prototype.p3 = 'some thery long string';
		Obj2.prototype.p4 = 'some thery long string';

		console.time('Obj1'); for (i = iterations; --i;) var o = new Obj1(); console.timeEnd('Obj1');
		console.time('Obj2'); for (i = iterations; --i;) var o = new Obj2(); console.timeEnd('Obj2');
	});
});

