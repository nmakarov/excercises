/**
 * concepts investigated here:
 *
 * `comma` operator
 * expressions evaluated to references and values.
 * global scope
 * accessing global scope stuff from inside.
 * 
 */

// these are expressions that yelds `eval` and it is not a reference to `eval`
// expression that yelds a function is an indirect function call and guaranteed to be executed in the global context/scope.
// expression evaluates to something. Evaluates to reference or evaluates to value.

var globalObj = (1,eval)('this');
var globalObj1 = (1,eval)('this');
var globalObj2 = (true && eval)('this');
var globalObj3 = (0 ? 0 : eval)('this');


function this1() {
	console.log('this: ', this === globalObj1);
	console.log('this: ', this === globalObj2);
	console.log('this: ', this === globalObj3);
}

this1();



x = 'outer';

function f() {
	return 'outer f';
}


function fp(p) {
	return 'outer function with parameter ' + p;
}

console.log('calling outer with parameter: ', fp('a'));
// console.log('calling outer with parameter: ', globalObj.fp('a'));

function enclosure () {

	function f() {
		return 'inner f';
	}


	function fp(p) {
		return 'inner function with parameter ' + p;
	}


	var x = 'inner';

	(eval)("console.log('direct: ', x)");
	(1,eval)('console.log("indirect call: " + x)'); 

	console.log('inner x:', (eval)('x'));
	console.log('outer x:', (1,eval)('x'));

	console.log('should be inner f:', (eval)('f()'));
	// console.log('should be outer f:', (1,eval)('f()'));
	console.log(f());
}

console.log('from top level: f():', f());
enclosure();
console.log('from top level: f():', f());



console.log("\n\nnow:");

var v = 'outer';

function modifyVo() {
	v = 'modified';
};

function fff() {
	var v = 'inner';

	var modifyV = function () {
		v = 'modified';
	};

	modifyV();
	console.log('now v: ', v);

	v = 'inner';
	// the following fould fail since `Function` couldn't look into the current scope...
	// Function('modifyV()')();
	// Function('modifyVo()')();
	console.log('now v: ', v);
}

fff();




function out() {
	console.log('I am the outer function');
}

function test3 () {
	function out() {
		console.log('I am the redefined outer function');
	}
	function inn() {
		console.log('I am the inner function');		
	}

	inn();
	out();
}

out();
test3();
out();
// ReferenceError: inn is not defined
// inn();
// 
// 

