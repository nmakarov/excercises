var assert = require('assert');

var numbers = [
  [123456789,'123,456,789'],
  [123, '123'],
  [1234, '1,234'],
  [1234567890.23, '1,234,567,890.23'],
];

var fmt = function (number) {
  return (''+number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

describe('Formatting numbers', function () {
  it('Integers, regexp', function () {

    numbers.forEach(function (pair) {
      assert.equal(fmt(pair[0]), pair[1]);
    });
  });
});
