var assert = require('assert');

// http://www.2ality.com/2014/05/is-integer.html
// 
// не то, чтобы надо прям упираться рогом и зубрить Стефанова и Крокфорда. Это как 
// у хорошего столяра в чемоданчике много всяких интересных штук, хотя он вполне может 
// обойтись стамеской, пилой и молотком. Наличие их не необходимо, не обязательно, что он 
// будет их использовать в каждом проекте, но знание - чего бывает и умение это заюзать
// - бесценно. Оно, собственно, и отличает столяра от мастера. Как-то так.

describe('Integer validators', function () {
  it('(x | 0) === x', function () {
    var bulk =    [1,0,-5,'a', '42', 8.35, 'a42', '42a'];
    var results = [true, true, true, false, false, false, false, false, false];

    var isInteger = function (x) {
      return (x | 0) === x;
    };

    assert(isInteger(42));
    assert( ! isInteger('a'));
  });


  it('x % 1 === 0', function () {
    var isInteger = function (x) {
      return x % 1 === 0;
    };

    // as expected
    assert(isInteger(42));
    assert( ! isInteger('a'));

    // glitches
    assert(isInteger(false));
    assert(isInteger(true));

    // overflow - depends of how `wide` bitwise operands could be
    // on my system (node 0.10.29, MacOS 10.9.4) it is 1024 bit; on some - 32.
    assert(isInteger(Math.pow(2, 1023)));

    // this one overflows:
    assert( ! isInteger(Math.pow(2, 1024)));
  });


  it('parseInt(x, 10)', function () {
    var isInteger = function (x) {
      return parseInt(x, 10) === x;
    };

    // as expected
    assert(isInteger(42));
    assert( ! isInteger('a'));
    assert( ! isInteger(false));
    assert( ! isInteger(true));

    // border cases
    assert( ! isInteger('42'));
    assert(isInteger(+'42'));

    assert(   isInteger(100000000000000000000));
    assert( ! isInteger(1000000000000000000000));
    // why? Here's why:
    assert.equal(String(1000000000000000000000), '1e+21');

    // glitches
  });

  it('Math.round(x) === x', function () {
    var isInteger = function (x) {
      return Math.round(x) === x;
    };

    // as expected
    assert(isInteger(42));
    assert( ! isInteger('a'));
    assert( ! isInteger(false));
    assert( ! isInteger(true));

    // border cases
    assert( ! isInteger('42'));
    assert(isInteger(+'42'));

    // these works just fine since no `to String` conversion happens
    assert(   isInteger(100000000000000000000));
    assert(   isInteger(1000000000000000000000));

    // glitches
  });

  it ('ECMAScript v.6 extensions', function (done) {
    // this wreck is needed to print `not supported` messages _after_ the test name
    setTimeout(function () {
      done();
      if ( typeof Math.trunc !== 'function') {
        console.log('Math.trunc is not supported');
      }
      if ( typeof Math.isInteger !== 'function') {
        console.log('Math.isInteger is not supported');
      }
    }, 0);
  });

  it ('!isNaN(+x)', function () {
    // it is more, like, isNumber since fractions are supported also.
    var isInteger = function (x) {
      return !isNaN(+x);
    };

    // as expected
    assert(   isInteger(42));
    assert( ! isInteger('a'));
    assert(   isInteger(false));
    assert(   isInteger(true));

    // border cases
    assert(   isInteger(4.26e307));
    assert(   isInteger('4.26e307'));
    assert(   isInteger(42.6));
    assert(   isInteger('42.6'));
    assert(   isInteger('42'));
    assert(   isInteger(+'42'));
    assert( ! isInteger('42a'));

    // these works just fine since no `to String` conversion happens
    assert(   isInteger(100000000000000000000));
    assert(   isInteger(1000000000000000000000));

    // that works, too:
    assert(   isInteger(Math.pow(2, 1025)));

  });

});