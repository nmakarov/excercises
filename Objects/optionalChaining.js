const expect = require('chai').expect;

const obj = {
    first: "first",
    second: "second",
    fn1: () => "response",
}

// will be working on Node 14 and up
describe("Optional", () => {
    it("Chaining", () => {
        expect(obj.first).eql("first");
        expect(obj?.third?.missing).eql(undefined);
    });
});
