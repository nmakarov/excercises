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

describe("Other random things", () => {
    it("Tokens", () => {
        const tokenGen = () => (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
        for (let i=10; i--;) {
            console.info("token:", tokenGen());
        }
    });

    it("uuids", () => {
        const four = () => Math.random().toString(16).slice(-4);
        const uuid = () => `${four()}${four()}-${four()}-${four()}-${four()}-${four()}${four()}${four()}`;
        for (let i=10; i--;) {
            console.info("uuid:", uuid());
        }
    });
});
