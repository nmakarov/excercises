// npx mocha simplePromise.js
const expect = require("chai").expect;

describe("Simple promise", () => {
    xit("Can make one simple promise", async () => {
        const promise = new Promise(resolve => resolve("resolved"));
        // or
        // const promise = Promise.resolve("resolved");
        expect(await promise).to.equal("resolved");
    });
    xit("Can make delayed promise", async () => {
        const promise = new Promise(resolve => setTimeout(() => resolve("resolved"), 500));
        const start = Date.now();
        expect(await promise).to.equal("resolved");
        expect(Date.now() - start).to.greaterThan(500);
    });

    it("Can make conditionally rejectable promise", async () => {
        const promise = x => new Promise((resolve, reject) => x < 10 ? resolve("resolved") : reject("rejected"));
        expect(await promise(5)).to.equal("resolved");
        // expect(await promise(15)).to.equal("rejected");
        // test for rejected scenario here: ...
        await promise(15).catch(e => expect(e).to.equal("rejected"));
    });

    it("Can make promises run in parallel", async () => {
        const promise = x => new Promise(resolve => resolve(x*2));
        expect(await promise(5)).to.equal(10);
        expect(await Promise.all([
            promise(2),
            promise(3)
        ])).to.deep.equal([4,6]);
    });

    it("Can make promises run in parallel even if some are rejected", async () => {
        const success = x => new Promise(resolve => resolve(x*2));
        const failure = () => new Promise((_, reject) => reject("failed"));

        const results = await Promise.allSettled([
            success(2),
            failure(),
            success(3),
        ]);
        expect(results).to.deep.equal([
            { status: 'fulfilled', value: 4 },
            { status: 'rejected', reason: 'failed' },
            { status: 'fulfilled', value: 6 }
        ]);
    });

    // extra bonus: if Promise.allSettled is not available? Make a home grown one
});
