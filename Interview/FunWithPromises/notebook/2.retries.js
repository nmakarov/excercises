// npx mocha 2.retries.js
const expect = require("chai").expect;

const fail90percent = () => new Promise((resolve, reject) => 
    Math.random() * 100 < 90
        ? reject("ops")
        : resolve("resolved"));

const promiseResolvedOn4thTry = () => {
    let tries = 0;
    return () => {
        return new Promise((resolve, reject) => {
            if (++tries === 4) {
                resolve("resolved");
            } else {
                console.info(">> rejected:", tries);
                reject(`try #${tries} rejected`);
            }
        })
    };
};

const promiseRetry = async promise => {
    try {
        return await promise();
    } catch (e) {
        return promiseRetry(promise);
    }
};

describe("Retry failed promises", () => {
    it("Simple retry", async () => {
        const promise = fail90percent;
        expect(await promiseRetry(promise)).to.equal("resolved");
    });

    it("Simple retry", async () => {
        const promise = promiseResolvedOn4thTry();
        expect(await promiseRetry(promise)).to.equal("resolved");
    });

    it("settled", async () => {
        const p1 = promiseRetry(fail90percent);
        const p2 = promiseRetry(fail90percent);
        const p3 = promiseRetry(fail90percent);
        const results = await Promise.all([p1, p2, p3]);
        expect(results).to.deep.equal([ 'resolved', 'resolved', 'resolved' ]);
    });

});


