
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
});
