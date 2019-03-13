const expect = require('chai').expect;

const ITERS = 1000;

const fibonacciRecursive = n => {
    return n < 2 ? n : fibonacciRecursive(n-1) + fibonacciRecursive(n-2);
}

const memoFibonacciRecursive = (n, m) => {
    m = m || [ 0, 1 ];
    if (n < 2) {
        return n;
    } else if (m[n]) {
        return m[n];
    }
    const m1 = memoFibonacciRecursive(n-1, m);
    const m2 = memoFibonacciRecursive(n-2, m);
    return m[n] = m1 + m2;
}

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

    it("Recursive+Memo", () => {
        const start = new Date;
        for(let i = ITERS; i--;) {
            memoFibonacciRecursive(25);
        }
        const end = new Date;
        console.info(">> performance:", (end-start)/1000);

    });
});

