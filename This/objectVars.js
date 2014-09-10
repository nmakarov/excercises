/**
 * The whole thing is needed to represent 3-tier object states - valid record with data, new record and invalid record. 
 */

var assert = require('assert');

var undef;
var clean = null;  // it used to be a record, but something had uninitialized it (and it has to be re-read from the DB, for instance)
var empty = {};    // it is a record, and emptiness indicates that it is a new record. 
var real = {a:1};  // it is a real record with real data in it.

var all = [undef, clean, empty, real];

var isClean = function (ref) {
	// return !ref;
	return ref === null || ref === undefined;
};

var isObject = function (ref) {
	return 'object' === typeof ref;
};

var isEmpty = function (ref) {
	if ( ! isObject) {
		return true;
	}
	var has = Object.hasOwnProperty;
	for (var key in ref) {
		if (has.call(ref,key)) {
			return false;
		}
	}
	return true;
};

describe('Testing Object Vars', function () {
	it('should recognize clean objects', function () {
		assert.equal(true, isClean(undef));
		assert.equal(true, isClean(clean));
		assert.equal(false, isClean(empty));
		assert.equal(false, isClean(real));
	});
	it('should recognize empty objects', function () {
		assert.equal(true, isEmpty(undef));
		assert.equal(true, isEmpty(clean));
		assert.equal(true, isEmpty(empty));
		assert.equal(false, isEmpty(real));
	});
	it('should recognize non-empty objects', function () {
		assert.equal(false, ! isEmpty(undef));
		assert.equal(false, ! isEmpty(clean));
		assert.equal(false, ! isEmpty(empty));
		assert.equal(true, ! isEmpty(real));
	});
});

all.map(function (ref) {
	console.log('ref: ', ref, ', type: ', (typeof ref), ', isEmpty? ', isEmpty(ref)) ;
});