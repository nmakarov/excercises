var assert = require('chai').assert;

describe ('Adding numbers', function () {
  it ('should add two numbers', function () {
    var add = function (a,b) {
      return a + b;
    };

    assert.equal(add(2,3), 5);
  });

  it ('should be called like add(num1)(num2)', function () {
    var add = function (a) {
      return function (b) {
        return a + b;
      };
    };

    assert.equal(add(2)(3), 5);

    var add3 = add(3);
    assert.equal(add3(4), 7);
    assert.equal(add3(5), 8);
  });

  it ('should take random number of digits', function () {
    var add = function (a) {
      var sum = a;
      var inner = function (b) {
        if (b) {
          sum += b;
          return inner;
        } else {
          return sum;
        }
      };
      return inner;
    };

    assert.equal(add(2)(3)(), 5);
    assert.equal(add(2)(3)(6)(), 11);

    var add2 = add(2);
    assert.equal(add2(6)(), 8);
    // the following should return 12, but returns 18:
    // assert.equal(add2(10)(), 12);
  });

  it ('should not have a pair of extra parenthesis', function () {
    var add = function (a) {
      var sum = a;

      var inner = function (b) {
        sum += b;
        return inner;
      };

      inner.valueOf = function () {
        return sum;
      };

      return inner;
    };

    assert.equal(add(3)(4), 7);
    assert.equal(add(3)(5), 8);
    assert.equal(add(9)(-5), 4);
    assert.equal(add(1)(2)(3), 6);
  });

  it('should be pure', function () {

    var add = function (orig) {
      var inner = function (val) {
        return add(parseInt(val+'', 10) == val ? inner.captured+val : inner.captured);
      };
      inner.captured = orig;
      inner.valueOf = function () {return inner.captured;};

      return inner;
    };

    assert.equal(add(3)(4), 7);
    assert.equal(add(3)(4)('aa')(5)(), 12);

    var three = add(3);
    var four = add(4);
    assert.equal(three, 3);
    assert.equal(four, 4);
    assert.equal(three(5), 8);
    assert.equal(three(6), 9);
    assert.equal(three(four), 7);
    assert.equal(three(four)(three(four)), 14);
    
  });

  it('should be smaller', function () {
    var add = function (orig) {
      var inner = function (val) {
        return add(parseInt(val+'', 10) == val ? orig+val : orig);
      };
      inner.valueOf = function () {return orig;};

      return inner;
    };

    assert.equal(add(3)(4), 7);
    assert.equal(add(3)(4)('aa')(5)(), 12);

    var three = add(3);
    var four = add(4);
    assert.equal(three, 3);
    assert.equal(four, 4);
    assert.equal(three(5), 8);
    assert.equal(three(6), 9);
    assert.equal(three(four), 7);
    assert.equal(three(four)(three(four)), 14);

  });

  it('should be smarter (contributed by ashtuchkin)', function () {

    var add = function (orig) {
      var inner = function (val) {
        return add( (+val || 0) + (+orig || 0) );
      };
      inner.valueOf = function () {return +orig || 0;};

      return inner;
    };

    assert.equal(add(2)(0)(3), 5);
    assert.equal(add(0)(0.5), 0.5);
    assert.equal(add('aa')(1), 1);
    assert.equal(add('aa'), 0);
  });

  it('should be even smarter (contributed by f0rk)', function () {

    var sum = function (args) {
      return Array.prototype.slice.call(args).reduce(function (m, el) { return m + el; }, 0);
    };

    var add = function () {
      var orig = sum(arguments);
      var inner = function () {
        var val = sum(arguments);
        
        return add((+val || 0) + (+orig || 0));
      };
      inner.valueOf = function () {return +orig || 0;};

      return inner;
    };

    assert.equal(add(2, 4, 6)(3)(2,3), 20);
    assert.equal(add(2)('a'), 2);
    assert.equal(add(2)()('aaa'), 2);
  });

});

