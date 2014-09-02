var changeHelper = function (amount, slots) {
	for (
		var i = 0, l = slots.length, change = [];
		// i < l;

		change[i] = Math.floor(amount / slots[i]),
		amount = amount % slots[i];
		i++
	);

	return change;
};


console.log(changeHelper(3247, [500, 100, 25, 10, 5, 1])); //[6, 2, 1, 2, 0, 2]