var makeCyclicIterator = function (/* array */ values) {
	var i = -1;
	return function () {
		return values[++i] || values[i = 0];
	};
};


var iter = makeCyclicIterator([1,3,5,7]);

var res = [];

res.push(iter());
res.push(iter());
res.push(iter());
res.push(iter());
res.push(iter());
res.push(iter());
res.push(iter());

console.log(res);