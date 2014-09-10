// run it like so: `node fn.js`

(function () {
  // 'use strict';
    console.log("\nNon-strict Self-Invoking Function");

  // handy global reference
  var glob = (1,eval)('this');

  // handy assert function
  glob.assert = function(a1, a2, msg) {
    console.log('(', a1 === a2 ? 'passed' : 'failed', ') ', msg);
  };

  // and testing of this handy assert function
  assert(2*2, 4, '2 x 2 = 4');
  assert(2*2, 5, '2 x 2 = 5');

  obj1 = {prop1:1};
  var obj2 = {prop2:2};

  console.log(glob);

  var fn = function (innerObj) {
    innerObj.propNew = 3;
    var innerObjRef = innerObj;
    innerObjRef.propByRef = 10;

    // create a new global object
    obj3 = {prop3:3};

    // redefine existing reference (outer references still point to desired object)
    innerObj = {prop4:4};
  };


  console.log("\nBefore:");
  assert(1, obj1.prop1, 'obj1 prop is set');
  assert(2, obj2.prop2, 'obj2 prop is set');
  assert('undefined', typeof obj1.propNew, 'obj1.propNew is undefined');
  assert('undefined', typeof obj3, 'obj3 is undefined, that\'s right');
  assert('undefined', typeof innerObj, 'innerObj is undefined from outside');

  fn(obj1);

  console.log("\nAfter:");
  assert(1, obj1.prop1, 'obj1 prop is set');
  assert(2, obj2.prop2, 'obj2 prop is set');
  assert('number', typeof obj1.propNew, 'obj1.propNew now is now defined!');
  assert('number', typeof obj1.propByRef, 'obj1.propByRef now is now defined as well!');
  assert('object', typeof obj3, 'obj3 is now defined!');
  assert('undefined', typeof innerObj, 'innerObj is still undefined from outside');
})();


(function () {
  "use strict";

  console.log("\nStrict Self-Invoking Function");
  assert(2,2,'assert works from outside even in `strict` mode!');

  assert('object', typeof obj1, 'obj1 was defined previously and happened to be global. Can be accessed even from under `strict` mode.');
  assert('undefined', typeof obj2, 'obj2 was locally scoped to previous SIF, and it is undefined here.');
})();

(function () {
  "use strict";

  console.log("\nSIF for testing closed vars");

  var outer = 1;
  assert(1, outer, 'outer set to `1`');

  var makeLock = function (ref) {
    return function () {
      return ref;
    };
  };

  var lock = makeLock(outer);

  assert(1, lock(), 'function uses locked (in time of execution) image of outer variable.');
  outer = 2;
  assert(2, outer, 'outer now set to `2`');
  assert(1, lock(), 'function still uses same locked image of outer variable.');

  var outerObject = {a:1};
  assert(1, outerObject.a, 'now outerObject is an object with a property `a`');
  lock = makeLock(outerObject);
  assert(1, lock().a, 'function uses (and returns) a reference to the same object with the same property.');
  outerObject.a = 2;
  assert(2, outerObject.a, 'outerObject.a reassigned.');
  assert(2, lock().a, 'whoa - the function returns the same reference to the same object which has a new value for the property!');
})();

