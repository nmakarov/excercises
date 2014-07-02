var assert = require('assert');
var readJSON = require('../promise_module').readJSON;

describe("promise", function () {
  it ("should read the file", function (done) {
    readJSON("file.json", function (err, data) {
      assert.equal(err, null);
      assert.notEqual(data, null);
      done();
    });
  });

  it ("should fail if filename is wrong", function (done) {
    readJSON("file.json1", function (err, data) {
      assert.notEqual(err, null);
      done();
    });
  });
});
