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
	});

	it("just reverse the string", () => {
		const palindrome = s => (
			s === [...s].reverse().join("")
		)
		assert.equal(palindrome("abcba"), true);
		assert.equal(palindrome("abcbb"), false);

		timing(palindrome, "just reverse the string");
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
	});

});