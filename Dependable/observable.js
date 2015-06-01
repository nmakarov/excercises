/*
(function () {
  'use strict';

var global = (1,eval)('this');

  var observable = function (dataStruct) {
    dataStruct.observable = true;
    return dataStruct;
  };

  global.observable = observable;
  global.isObservable = function (dataStruct) {
    return !! dataStruct.observable;
  };
}());


var a = {a:1};
console.log(a, ' observable: ', observable(a).isObservable);

var b = "abc";
observable(b);

var c = 4;
observable(c);

observable(5);

*/