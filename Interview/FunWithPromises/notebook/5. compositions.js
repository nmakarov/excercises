const expect = require("chai").expect;

const number = x => () => new Promise(resolve => resolve(x));
const add = x => y => new Promise(resolve => resolve(x + y));
const multiply = x => y => new Promise(resolve => resolve(x * y));
const compose = async (...funcs) => {
    let result;
    for (const fn of funcs) {
        result = await fn(result);
    }
    return result;
};

describe("Compositions", () => {
    it("Can combine operations", async () => {
        const sequence = compose(number(2), add(3), multiply(4));
        expect(await sequence).to.equal(20);
    });
});
