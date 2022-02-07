const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const request = require("supertest");
const { expect } = chai;
const { add } = require("../server/handlers");
const { app } = require("../server/server");

describe("Testing handlers", () => {
    it("handler for /add works", () => {
        const req = { query: { x: 3, y: 4 }};
        // TODO: replace `jest.fn()` with `spy`
        // const res = { json: jest.fn() };
        const res = { json: () => {} };
        const spy = jest.spyOn(res, "json");
        add(req, res);
        // expect(res.json.mock.calls[0][0].value).to.equal(7);
        expect(res.json).to.have.been.calledOnce;
    });
});

describe("Testing routers", () => {
    it("route for /add", async () => {
        const res = await request(app).get("/add?x=2&y=3");
        expect(res.statusCode).to.equal(200);
        expect(res.body.value).to.equal(5);
    });
});

