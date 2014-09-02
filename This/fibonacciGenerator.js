var fibGenerator = (function () {
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
})();

var fibs = [];
fibs.push(fibGenerator());
fibs.push(fibGenerator());
fibs.push(fibGenerator());
fibs.push(fibGenerator());
fibs.push(fibGenerator());
fibs.push(fibGenerator());
console.log(fibs.join(', '));


// fibs = [];
for (
	var i = 2, fibs2 = [1,2];
	i < 6;
	fibs2.push(fibs2[i-1] + fibs2[i-2]), i++
);
console.log(fibs2.join(', '));

