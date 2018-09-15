const assert = require("assert");
const iterations = 1000;

const timing = (fn, title, c=iterations) => {
	console.time(title);
	for (let i=0; i<c; i++) {
		fn("abcba");
	}
	console.timeEnd(title);
}

describe("palindrome tests", () => {
	it("reduce solution", () => {
		const palindrome = s => (
			s.split("").reduce((acc, c, i) => (
				acc && i < s.length && c === s[s.length-1-i]
			), true)
		);
		assert.equal(palindrome("abcba"), true);
		assert.equal(palindrome("abcbb"), false);

		timing(palindrome, "reduce solution");
		// 1.062ms, yes, reduce is not particularly fast
	});

	it("reduce solution, walking half the string", () => {
		const palindrome = s => (
			s.slice(0, s.length/2).split("").reduce((acc, c, i) => (
				acc && i < s.length && c === s[s.length-1-i]
			), true)
		);
		assert.equal(palindrome("abcba"), true);
		assert.equal(palindrome("abcbb"), false);

		timing(palindrome, "reduce solution, walking half the string");
		// 0.642ms, half the time, as expected
	});

	it("just reverse the string", () => {
		const palindrome = s => (
			s === [...s].reverse().join("")
		)
		assert.equal(palindrome("abcba"), true);
		assert.equal(palindrome("abcbb"), false);

		timing(palindrome, "just reverse the string");
		// 0.335ms
	});

	it("rudimentary 'for' loop", () => {
		const palindrome = s => {
			for (let i = 0; i < s.length/2; i++) {
				if (s[i] !== s[s.length-1-i]) {
					return false;
				}
			}
			return true;
		}
		assert.equal(palindrome("abcba"), true);
		assert.equal(palindrome("abcbb"), false);

		timing(palindrome, "rudimentary 'for' loop");
		// 0.407ms – good old trustworthy loop
	});

	it("optimized 'for' loop", () => {
		const palindrome = s => {
			for (let l=s.length, i = 0; i < l/2; i++) {
				if (s[i] !== s[l-1-i]) {
					return false;
				}
			}
			return true;
		}
		assert.equal(palindrome("abcba"), true);
		assert.equal(palindrome("abcbb"), false);

		timing(palindrome, "optimized 'for' loop");
		// 0.284ms - taking out calculations out of the loop body does miracles
	});

	it("optimized 'for' loop #2", () => {
		const palindrome = s => {
			for (let l=s.length, l2=l/2, i = 0; i < l2; i++) {
				if (s[i] !== s[l-1-i]) {
					return false;
				}
			}
			return true;
		}
		assert.equal(palindrome("abcba"), true);
		assert.equal(palindrome("abcbb"), false);

		timing(palindrome, "optimized 'for' loop #2");
		// 0.448ms - what?! taking out division (expensive op!) out of the loop body actually slows it down...
	});

	it("optimized 'for' loop #3", () => {
		const palindrome = s => {
			for (let l=s.length, l2=Math.floor(l/2), i = 0; i < l2; i++) {
				if (s[i] !== s[l-1-i]) {
					return false;
				}
			}
			return true;
		}
		assert.equal(palindrome("abcba"), true);
		assert.equal(palindrome("abcbb"), false);

		timing(palindrome, "optimized 'for' loop #3");
		// 0.281ms - aha, comparing an integer to a float is expensive, too. Pre-converting float to integer fixed it.
	});


});