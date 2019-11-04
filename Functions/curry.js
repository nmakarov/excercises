const expect = require('chai').expect;

describe("Curry function", () => {
    const add3 = (a, b, c) => a + b + c;

    it("Take 1", () => {
        expect(add3(2,3,4)).eql(9);
    });

    it("Take 2", () => {
        const curry = fn => {
            return function curried(...args) {
                return args.length === fn.length 
                    ? fn.apply(this, args)
                    : (...args2) => curried.apply(this, [...args, ...args2])
            }
        };

        const add3curried = curry(add3);
        expect(add3curried(2,3,4)).eql(9);
        expect(add3curried(2,3)(4)).eql(9);
        expect(add3curried(2)(3,4)).eql(9);
        expect(add3curried(2)(3)(4)).eql(9);
        expect(add3curried()(2)(3)(4)).eql(9);
        expect(add3curried()(2,3)(4)).eql(9);
    });
});
