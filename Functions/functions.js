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
      // console.log(double.prototype);
    });

  });

  // figovina
  describe('with two args', function () {
    it ('should demonstrate `out of scope` thingy', function () {
      assert.equal(typeof double, 'undefined');      
    });
  });

  describe('mutable?', function () {
    it('functions are not mutable', function () {
      var fn = function () { return 2;};
      assert.equal(2, fn());

      var makeDouble = function (aFn) {
        aFn = function () {
          return 4;
        };
        return aFn;
      };

      var double = makeDouble(fn);
      assert.equal(4, double());
      assert.equal(2, fn());
    });

    it('objects are', function () {
      var obj = {a:1};
      assert.equal(1, obj.a);
      var fn = function (o) {
        o.b = 2;
        o = {a:5};
      };
      fn(obj);
      assert.equal(1, obj.a);
      assert.equal(2, obj.b);
    });

    it('functions should have props mutable', function () {
      var fn = function () {
        return 2;
      };
      fn.a = 3;
      assert.equal(2, fn());
      assert.equal(3, fn.a);

      var makeDouble = function (aFn) {
        var glob = (1, eval)(this);
        aFn.b = 5;
        
        // right here: link is about to be broken between a ref variable name `aFn` and whatever it was pointed to.
        aFn = function () {
          return 4;
        };
        aFn.c = 6;

        // console.log(bFn);

        return aFn;      

      };
      var double = makeDouble(fn);

      assert.equal(4, double());
      assert.equal(2, fn());
      assert.equal(3, fn.a);
      assert.equal(5, fn.b);
      assert.equal(undefined, fn.c);

      assert.equal('undefined', typeof aFn);


    });
  });
});

