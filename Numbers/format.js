/*
 * These excersizes train different types of programmatic thinking - regexp thinking, procedural thinking, etc.
 */


var assert = require('assert');

var numbers = [
  [123456789,'123,456,789'],
  [123, '123'],
  [1234, '1,234'],
  [1234567890.23, '1,234,567,890.23'],
];

describe('Formatting numbers', function () {

  it('regexp', function () {

    var fmt = function (number) {
      return (''+number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    };

    numbers.forEach(function (pair) {
      assert.equal(fmt(pair[0]), pair[1]);
    });
  });



  it('Pure string manipulations', function () {

    var fmt = function (number) {

      // massage input
      number = '' + number;

      var dotPosition = number.indexOf('.') !== -1 ? number.indexOf('.') : 999999;
      var whole = number.substr(0, dotPosition);
      var fraction = number.substr(dotPosition + 1);
      var result = '';

      for (var i = whole.length; i--;) {
        result = whole[i] + result;
        if ((whole.length - i) % 3 === 0 && i > 0) {
          result = ',' + result;
        }
      }

      if (fraction) {
        result = result + '.' + fraction;
      }

      return result;
    };

    numbers.forEach(function (pair) {
      assert.equal(fmt(pair[0]), pair[1]);
    });

  });
});
