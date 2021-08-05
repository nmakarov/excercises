const expect = require('chai').expect;

const wait = time => new Promise(r => setTimeout(r, time));
const tick = 100;

describe("Testing async", () => {
    it("sequential", async () => {
        const start = Date.now();
        await wait(tick);
        await wait(tick);
        await wait(tick);
        const stop = Date.now();
        expect(stop - start).to.be.above(tick * 3);
    });

    it("parallel", async () => {
        const start = Date.now();
        const p1 = wait(tick);
        const p2 = wait(tick);
        const p3 = wait(tick);
        await p1;
        await p2;
        await p3;
        const stop = Date.now();
        expect(stop - start).to.be.below(tick * 1.1);
    });
});

