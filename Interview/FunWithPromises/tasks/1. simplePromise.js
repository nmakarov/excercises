// npx mocha simplePromise.js
const expect = require("chai").expect;

describe("Simple promise", () => {
    it("Can make one simple promise", async () => {
        const promise = Promise.resolve("resolved");
        expect(await promise).to.equal("resolved");
    });
});