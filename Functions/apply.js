
// run like so:
// mocha -R spec Functions/apply.js

var assert = require('assert');

describe ('Apply', function () {

  var size = 50;
  var max = 4;
  var arr = Array.apply('whatever', Array(size)).map(function(){return Math.floor(Math.random() * max);});

  describe('Array of predefined size with random values', function () {

    it('is an object', function () {
      assert.equal(typeof arr, 'object');
    });

    it('has length property', function () {
      assert(arr.length);
      assert(!isNaN(+arr.length));
      assert(arr.length === size);
    });

    it('has reduce property', function () {
      assert.equal(typeof arr.reduce, 'function');
    });

    it('values are withing boundaries', function () {
      assert.equal(0, arr.reduce(function (prev, curr) { return curr < prev ? curr : prev;}, 999999), 'it is ok if failed: randomly generated values are nightmare to test');
      assert.equal(3, arr.reduce(function (prev, curr) { return curr > prev ? curr : prev;}, 0), 'it is ok if failed: randomly generated values are nightmare to test');
    });

  });

});
