import assert from 'assert';
import chai from 'chai';
const expect = chai.expect;

describe ('ES6 goodness', function () {
	it("assignments", () => {
		const tom = {
			name: "Tom",
			age: 9
		};

		const jerry = Object.assign({}, tom, { name: "Jerry" });

		expect(jerry).to.be.deep.equal({name: "Jerry", age: 9});

	});

	it('object spread', function () {
		const tom = {
			name: "Tom",
			age: 9
		};

		const jerry = {
			...tom,
			name: "Jerry"
		};

		expect(jerry).to.be.deep.equal({name: "Jerry", age: 9});
		tom.age += 1;
		expect(jerry.age).to.be.equal(9);
	});

	it("array spread", () => {
		const breakfast = ["apple", "bread", "tea"];
		const leftovers = [...breakfast, "napkins", "utensils"];

		expect(leftovers.length).to.be.equal(5);
	});

	it("easy array ops", () => {
		const source = ["apple", "banana"];
		expect(source.join(", ")).to.be.equal("apple, banana");

		// adding element:
		const abc = [...source, "cherry"];
		expect(abc.map(fruit => fruit.charAt(0)).join("")).to.be.equal("abc");

		// removing an element:
		const ac = abc.filter(fruit => fruit !== "banana");
		expect(ac.join(", ")).to.be.equal("apple, cherry");

		// replacing an element:
		const azc = abc.map(fruit => fruit !== "banana" ? fruit : "zuccini");
		expect(azc.join(", ")).to.be.equal("apple, zuccini, cherry");

		// adding a set:
		const xyz = ["xylo", "yellow", "zinc"];
		const abcxyz = [...abc, ...xyz];
		expect(abcxyz.join(", ")).to.be.equal("apple, banana, cherry, xylo, yellow, zinc");
	});
});

