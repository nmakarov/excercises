
// run like so:
// mocha -R spec Craziness/yep.js

// ===============================================================================
// HUGE DISCLAIMER AND WARNING:
// Don't be an interview jerk and ask questions like "What does {} + [] returns?".
// That's just mean.
// ===============================================================================

var assert = require('assert');

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
});
