
// run like so:
// mocha -R spec abstract/prototypes.js

// ===============================================================================
// HUGE DISCLAIMER AND WARNING:
// Don't be an interview jerk and ask questions like "What does {} + [] returns?".
// That's just mean and completely useless. Because if they know the answer,
// they're either antisocial jerks themselves, Douglas Crockford or Nick Makarov.
// ===============================================================================

var assert = require('assert');
var glob = this;

describe ('Prototypes', function () {

  describe('simple call', function () {
    var Obj = function () {};
    Obj.prototype.key = 'value';
    Obj.prototype.fn = function () {return this.key;};
    var obj = new Obj();

    it('direct vs. prototype.call', function () {
      assert.equal(obj.fn(), 'value');
      assert.equal(Obj.prototype.fn.call(obj), 'value');
    });
  });

  it('direct vs call vs apply', function () {
    var f = function (a,b,c) {
      return 'a:'+a+', b:'+b+', c:'+c;
    };

    var direct = f(2,4,6);
    assert.equal(direct, f.call(this,2,4,6));
    assert.equal(direct, f.apply(this,[2,4,6]));
  });

  describe ('objects', function () {

    it ('inherits from Object', function () {
      var obj = {a: 1};
      assert(obj instanceof Object);
    });
  });

  it ('playing with...', function () {
    var P1 = function () {};
    var P2 = function () {};

    var p1 = new P1();

    assert.equal(p1 instanceof P1, true);
    assert.equal(p1 instanceof Object, true);

    assert.equal(p1 instanceof P2, false);

    // let's build a simple chain:
    P1.prototype = new P2();
    var p2 = new P1();
    assert.equal(p2 instanceof P2, true);
    assert.equal(p2 instanceof P1, true);

    assert.equal(p1 instanceof P2, false); // why?
    assert.equal(p1 instanceof P1, false); // why?

  });

  describe('Cool stuff', function () {
    it('can be rounded by shift', function () {
      assert.equal(123.45 >> 0, 123);
    });
    it('is it array?', function () {
      assert([1,3,5] instanceof Array);
    });
    describe('shallow array copy', function () {
      it('bad way (never do it)', function () {
        var a = [1,3,5];
        var b = a;

        b[1] = 100;                       // modify second element
        assert.equal(a[1] === 3, false);  // original array modified since a and b just pointers to the same stuff
      });
      it('good way', function () {
        var a = [1,3,5];
        var b = a.slice();

        b[1] = 100;                       // modify second element
        assert.equal(a[1] === 3, true);   // that works now.
      });
    });
  });

  describe('Functions', function () {
    var f = function () {return this;};
    var o = {key: 'value', f: function () {return this;}};
    describe('has different contexts (this)', function () {
      it('standalone: global', function () {
        assert.equal(f().process.title, 'node');
      });
      // console.info('this:',this.constructor);

      it ('apply/call: whatever you pass as a first arg', function () {
        assert.equal(f.call(4), 4);
        assert.equal(f.call('abc'), 'abc');
      });

      it ('apply/call: global if you pass nothing', function () {
        assert.equal(f.call().process.title, 'node');
        assert.equal(f.call(undefined).process.title, 'node');
        assert.equal(f.call(null).process.title, 'node');
      });

      it('as a method: the object', function () {
        assert.equal(o.f().key, 'value');
      });

      it('watch this crap:', function () {
        var fi = o.f;
        assert.equal(fi().process.title, 'node');
        // wow
        // it is because the context solely depends on how you call a function.
      });

      it('universal solution: bind it!', function () {
        var _bind = function (func, context) {
          return function () { return func.apply(context, arguments); };
        };

        var bindedF = _bind(o.f, o);
        assert.equal(bindedF().key, 'value');
      });
    });
  });
});

/*
var obj1 = {a:'b'};
// the following is identical, because `toString` works with the `this` object, which is the first parameter anyway
console.log('obj1: ' + obj1.toString());
console.log('obj1: ' + Object.prototype.toString.call(obj1));
*/

