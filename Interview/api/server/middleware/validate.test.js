const expect = require("chai").expect;
const sinon = require("sinon");

const { validate } = require("./validate");

describe("Validate tests", () => {
    const next = () => {};
    it("Testing locations", () => {
        const schema = {
            field1: {},
            field2: { required: false },
        };
        const req = {
            query: { field1: "abc" },
        }
        validate(schema)(req, null, next);
        expect(req.data.field1).to.equal("abc");
        // console.info(req.data);
    });
    it("Testing numbers", () => {
        const schema = {
            field1: { type: "number" },
        };
        const req = {
            query: { field1: "8" },
        }
        validate(schema)(req, null, next);
        expect(req.data.field1).to.equal(8);

        req.query.field1 = "abc";
        validate(schema)(req, null, next);
        expect(req.errors instanceof Array).to.equal(true);
        expect(req.errors[0]).to.equal("field1 should be numeric");
    });
});
