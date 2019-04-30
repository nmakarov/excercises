const expect = require('chai').expect;

const ITERS = 1000;

const fibonacciRecursive = n => 
    n < 2 ? n : fibonacciRecursive(n-1) + fibonacciRecursive(n-2);


const fibonacciStraight = n => {
    const fibs = [ 0, 1 ];
    for (let i = 2; i<=n; i++) {
        fibs.push(fibs[i-1] + fibs[i-2]);
    }
    return fibs[n];
}

const memoFibonacciRecursive = (n, m=[0,1]) => 
    n < 2 ? n :
    m[n] ? m[n] :
    m[n] = memoFibonacciRecursive(n-1, m) + memoFibonacciRecursive(n-2, m)


describe("Testing fibonacci funcs", () => {
    const facts = {
        0: 0,
        1: 1,
        2: 1,
        3: 2,
        4: 3,
        5: 5,
        6: 8,
        7: 13,
        8: 21,
        9: 34
    }
    it("Recursive", () => {
        for (var k in facts) {
            expect(+fibonacciRecursive(k)).eq(facts[k]);
        }
    });

    it("Recursive+Memo", () => {
        // expect(+memoFibonacciRecursive(6)).eq(8);
        for (var k in facts) {
            expect(+memoFibonacciRecursive(k)).eq(facts[k]);
        }
    });

    it("Straight", () => {
        for (var k in facts) {
            expect(+fibonacciStraight(k)).eq(facts[k]);
        }
    });

});

describe("Performance", () => {
    it("Recursive", () => {
        const start = new Date;
        for(let i = ITERS; i--;) {
            fibonacciRecursive(25);
        }
        const end = new Date;
        console.info(">> performance:", (end-start)/1000);
    });

    it("Straight", () => {
        const start = new Date;
        for(let i = ITERS; i--;) {
            fibonacciStraight(25);
        }
        const end = new Date;
        console.info(">> performance:", (end-start)/1000);
    });

    it("Recursive+Memo", () => {
        const start = new Date;
        for(let i = ITERS; i--;) {
            memoFibonacciRecursive(25);
        }
        const end = new Date;
        console.info(">> performance:", (end-start)/1000);

    });
});

