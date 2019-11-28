const expect = require('chai').expect;

describe("three daughters", () => {
    it("first try", () => {
        // d1 * d2 * d3 = 72
        const denoms = number => {
            // const primes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 ];
            const res = {};
            for (let d1 = 1; d1 < number/2; d1++) {
                for (let d2 = d1; d2 < number/2; d2++) {
                    const d3 = number / d1 / d2;
                    if (parseInt(d3) === d3) {
                        let key = [d1, d2, d3].sort((a,b) => a-b).join(", ");
                        if ( ! res[key]) {
                            res[key] = d1 + d2 + d3;
                        }
                    }
                }
            }
            console.info(res);
        };

        denoms(72);
        // answer is '3, 3, 8': 14,

    });
});