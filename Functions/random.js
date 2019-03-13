var expect = require('chai').expect;

const makeGen1 = (a, c, m) => x => (a*x+c) % m;

describe("Generator #1", () => {
    it("A few numbers", () => {
        const g = makeGen1(55,110,1000);
        let x0 = 1;
        let x;
        for(let i = 1; i<10; i++) {
            x = g(x0);
            console.info(`${i}: ${x}`);
            x0 = x;
        }
    });
    
});
