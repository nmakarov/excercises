const chai = require("chai");
const expect = require("chai").expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { createError, NiceError, niceResponse, niceErrors } = require("./niceErrors");

chai.use(sinonChai);

describe("NiceErrors tests", () => {
    it("Should create an instance of NiceError", () => {
        const err = createError(404);
        expect(err instanceof NiceError).to.be.true;
        expect(err).to.have.property("status");
        expect(err).to.have.property("message");
        expect(err.status).to.equal(404);
        expect(err.message).to.equal("Not Found");
    });

    it("Should create an instance of NiceError with a string code", () => {
        const err = createError("not Found");
        expect(err instanceof NiceError).to.be.true;
        expect(err).to.have.property("status");
        expect(err).to.have.property("message");
        expect(err.status).to.equal(404);
        // expect(err.message).to.equal("Not Found");
    });

    it("Should create an instance of NiceError by a function", () => {
        const err = createError.NotFound();
        expect(err instanceof NiceError).to.be.true;
    });

    it("Should take an optional message", () => {
        const err = createError.NotFound("ops");
        expect(err instanceof NiceError).to.be.true;
        expect(err.message).to.equal("ops");
    });
});

describe("NiceResponse tests", () => {
    it("Should just work", () => {
        const res = {
            json: sinon.spy(),
        };
        niceResponse(null, res, () => {});
        expect(res).to.have.property("niceResponse");
        res.niceResponse();
        expect(res.json.calledOnce).to.equal(true);
    });
});

describe("NiceError tests", () => {
    it("Should just work, happy path", () => {
        const res = {
            status: sinon.spy(() => res),
            json: sinon.spy(),
            set: sinon.spy(),
        };
        const error = createError.NotFound();
        niceErrors(error, null, res, () => {});
        // expect(res).to.have.property("niceResponse");
        // res.niceResponse();
        expect(res.json.calledOnce).to.equal(true);
        expect(res.status.calledOnce).to.equal(true);
        expect(res.status.calledWith(404)).to.equal(true);
        expect(res.set.calledOnce).to.equal(true);
    });

    it("Headers sent already", () => {
        const res = {
            headersSent: true,
        };
        const error = "whatever";
        const next = sinon.spy();
        niceErrors(error, null, res, next);
        expect(next.calledOnce).to.equal(true);
        expect(next.calledWith("whatever")).to.equal(true);
    });

    it("Non nice error", () => {
        const res = {
            status: sinon.spy(() => res),
            json: sinon.spy(),
            set: sinon.spy(),
        };
        const error = "whatever";
        const next = sinon.spy();
        niceErrors(error, null, res, next);
        expect(res.json.notCalled).to.equal(true);
        expect(next.withArgs("whatever").calledOnce).to.equal(true);
    });
});

