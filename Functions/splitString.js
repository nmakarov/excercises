const expect = require('chai').expect;

const str = "this is a long string";

const processString1 = str => str.split('').join('');
describe("SplitString", () => {
    it("all works", () => {
        expect(processString1(str)).eql(str);
    })
});

console.info("aaa");
