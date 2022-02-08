// npx mocha simplePromise.js
const expect = require("chai").expect;

describe("Simple promise", () => {
    xit("Can make one simple promise", async () => {
        const promise = null; // <---
        expect(await promise).to.equal("resolved");
    });

    xit("Can make delayed promise", async () => {
        const promise = 0; // <---
        const start = Date.now();
        expect(await promise).to.equal("resolved");
        expect(Date.now() - start).to.greaterThan(500);
    });

    xit("Can make conditionally rejectable promise", async () => {
        const promise = x => 0; // <---
        expect(await promise(5)).to.equal("resolved");
        await promise(15).catch(e => expect(e).to.equal("rejected"));
    });

    xit("Can make promises run in parallel", async () => {
        const promise = 0; // <---
        expect(await promise(5)).to.equal(10);
        expect(await Promise.all([
            promise(2),
            promise(3)
        ])).to.deep.equal([4,6]);
    });

    it("Can make promises run in parallel even if some are rejected", async () => {
        const success = 0; // <---
        const failure = 0; // <---

        const results = 0; // <---
        
        expect(results).to.deep.equal([
            { status: 'fulfilled', value: 4 },
            { status: 'rejected', reason: 'failed' },
            { status: 'fulfilled', value: 6 }
        ]);
    });
});
