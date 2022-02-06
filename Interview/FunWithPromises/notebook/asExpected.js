const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { describe } = require("mocha");
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Testing resolve and reject", () => {
    const promise = x => x < 10 ? Promise.resolve(x*10) : Promise.reject("rejected");

    it("resolves as promised", function() {
        return expect(promise(5)).to.eventually.equal(50);
    });
    
    it("rejects as promised", function() {
        return expect(promise(15)).to.be.rejectedWith("rejected");
    });    
});
