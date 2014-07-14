var assert = require('assert');

describe ('Functions', function () {

  describe('with one argument', function () {
    var double = null;
    
    beforeEach(function () {
      double = function (x) {
        return x * 2;
      };  
    });

    it('should be defined and of right type', function () {
      assert(double, 'exists');
      assert.equal(typeof double, 'function');
    });

    it ('should be callable by all means', function () {
      assert.equal(4, double(2));
      assert.equal(4, double.apply(null,[2]));
      assert.equal(typeof double.prototype, 'object');
      assert.equal(typeof double, 'function');
      double.prototype = double;
      assert.equal(4, double.prototype.apply(null,[2]));
      console.log(double.prototype);
    });

  });

  describe('with two args', function () {
    it ('should demonstrate `out of scope` thingy', function () {
      assert.equal(typeof double, 'undefined1');      
    });
  });
});

