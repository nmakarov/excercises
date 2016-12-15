export default class Converter {
	constructor(amount, units="bu") {
		this.amount = amount;
	}

	get bu() {
		return this.amount;
	}

	get mt() {
		return this.amount / 39;
	}
}
