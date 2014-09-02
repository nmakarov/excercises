var fibGenerator = function () {
	var a=0, b=1, next;
	return function () {
		next = a + b;
/*
		a = b;
		b = next;
		return next;
*/
		return b = (a = b, next);
	};
};

var generator = fibGenerator;
var fibGen = generator();
var fibs = [];
fibs.push(fibGen());
fibs.push(fibGen());
fibs.push(fibGen());
fibs.push(fibGen());
fibs.push(fibGen());
fibs.push(fibGen());
console.log(fibs.join(', '));
