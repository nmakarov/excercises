// npx mocha 2.retries.js
const expect = require("chai").expect;

const fail90percent = () => {}; // <---

const promiseResolvedOn4thTry = () => {};  // <---

const promiseRetry = () => {}; // <---

describe("Retry failed promises", () => {
    it("Simple retry 1", async () => {
        const promise = fail90percent;
        expect(await promiseRetry(promise)).to.equal("resolved");
    });

    it("Simple retry 2", async () => {
        const promise = promiseResolvedOn4thTry();
        expect(await promiseRetry(promise)).to.equal("resolved");
    });
});


