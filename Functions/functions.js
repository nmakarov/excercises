// run like so:
// mocha -R spec Functions/functions.js

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

describe('Classes, coffeescript approach', function () {
  __extends = function(child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key))
        child[key] = parent[key];
    }

    var ctor = function (obj) {
      this.constructor = obj;
    };
    ctor.prototype = parent.prototype;

    child.prototype = new ctor(child);
    child.__super__ = parent.prototype;
    return child;
  };


  var Figure = null;
  var Square = null;

  beforeEach(function () {

    // ---------------- CLASS FIGURE ----------------
    Figure = (function () {
      function Figure (color) {
        this.color = color;
      }

      Figure.prototype.tell = function () {
        return 'color ' + this.color;
      };

      return Figure;
    })();


    // ---------------- CLASS SQUARE ----------------
    Square = (function (_super) {

      var _Square = function (whatever, side) {
        this.side = side;
        _Square.__super__.constructor.apply(this, arguments);
      };

      __extends(_Square, _super);

      _Square.prototype.tell = function () {

        return "Square side " + this.side + " and " + _Square.__super__.tell.call(this);
      };

      return _Square;
    })(Figure);
  });

  describe('parent', function () {
    it('can be instantiated', function () {
      var f = new Figure('black');
      assert.equal('color black', f.tell());
    });
  });

  describe('child', function () {
    it('can be instantiated', function () {
      var f = new Square('black', 5);
      assert.equal('Square side 5 and color black', f.tell());
    });
  });

});

describe('Classes, classy approach', function () {
  it('can be created and instantiated', function () {
    var A = function () {this.constructedBy = 'A';};
    var a = new A();
    assert.equal(true, a instanceof A);
  });

  it('can have parent class', function () {
    var A = function () {this.constructedBy = 'A';};
    A.prototype.a = {};
    var B = function () {this.constructedBy = 'B';};
    B.prototype = new A();
    B.prototype.b = {};

    B.prototype.constructor = B;

    var a = new A();
    var b = new B();

    assert.equal(true, a instanceof A);
    assert.equal(true, b instanceof B);
    assert.equal(true, b instanceof A);

    assert.equal(A, a.constructor);
    assert.equal(B, b.constructor);

    assert.equal('A', a.constructedBy);
    assert.equal('B', b.constructedBy);

    assert.equal('object', typeof a.a);
    assert.equal('object', typeof b.a);

    assert.equal('undefined', typeof a.b);
    assert.equal('object', typeof b.b);

    assert.equal('A', a.constructedBy);
    assert.equal('B', b.constructedBy);
  });

  it('grandchildren works, too', function () {
    var A = function () {this.constructedBy = 'A';};
    A.prototype.a = {};
    var B = function () {this.constructedBy = 'B';};
    B.prototype = new A();
    B.prototype.b = {};
    B.prototype.constructor = B;


    var C = function () {};
    C.prototype = new B();

    var c = new C();

    assert.equal(true, c instanceof C);
    assert.equal(true, c instanceof B);
    assert.equal(true, c instanceof A);

    assert.equal('object', typeof c.a);
    assert.equal('object', typeof c.b);

  });

  it('breakin and fixin prototype chain', function () {
    var A = function () {this.constructedBy = 'A';};
    A.prototype.a = {};

    var B = function () {this.constructedBy = 'B';};
    B.prototype = new A();
    B.prototype.b = {};
    B.prototype.constructor = B;

    var C = function () {};
    C.prototype = new B();

    var a = new A();
    var c = new C();

    // chain works
    assert.equal(a.a, c.a);

    // breaking bad
    B.prototype.a = {};
    assert.notEqual(a.a, c.a);

    // fixin'
    delete B.prototype.a;
    assert.equal(a.a, c.a);

  });

  it('mediator pattern', function () {
    var extend = function (parent) {
      var F = function () {};
      F.prototype = parent.prototype;
      return new F();
    };

    var A = function () {};
    var B = function () {};

    B.prototype = extend(A);

    var a = new A();
    var b = new B();

    assert.equal(true, b instanceof A);
  });

  it('mediator pattern with constructor reset', function () {
    var childParent = function (Child, Parent) {
      var F = function () {};
      F.prototype = Parent.prototype;
      Child.prototype = new F();
      Child.prototype.constructor = Child;
    };

    var A = function () {};
    var B = function () {};

    childParent(B, A);

    var a = new A();
    var b = new B();

    assert.equal(true, b instanceof A);
    assert.equal(B.prototype.constructor, B);
  });

});

