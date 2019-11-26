const expect = require('chai').expect;

const max = 1000000;

const makeArray = length => [... new Set(new Set((new Array(length)).fill(1).map(e => (Math.random()*length*2).toFixed(0))))].map(e => +e).sort((a, b) => a-b);

// console.info(">>>", makeArray(50).join(","));

const s = 1;
describe("Duplicates problem", () => {
    const pairs = [
        [[1, 3, 4, 7, 13], [1, 2, 4, 13, 15]],
        [[6,7,10,11,13,15,16,17,18,19,21,27,29,33,35,44,49,50,51,54,55,59,60,61,62,64,66,67,68,72,73,74,75,77,78,79,80,83,85,86,87,91,93,98,99], [1,5,13,16,20,21,26,28,35,37,40,41,42,45,46,47,48,50,52,56,62,66,67,71,72,75,77,80,81,82,83,85,89,91,93,96,97]],
    ];
    it("straightforward", () => {
        const findDuplicates = (a1, a2) => {
            return a1.filter(a => a2.includes(a));
        }

        expect(findDuplicates(pairs[0][0], pairs[0][1])).eql([1,4,13]);

        const [a1, a2] = pairs[s];
        const t = (new Date).getTime();
        for(let i = max; --i;) {
            const tmp = findDuplicates(a1, a2);
        }
        console.info(">> 1:", (new Date).getTime() - t);
    });

    it("sets", () => {
        const findDuplicates = (a1, a2) => {
            const sa2 = new Set(a2);
            return a1.filter(a => sa2.has(a));
        }
        expect(findDuplicates(pairs[0][0], pairs[0][1])).eql([1,4,13]);

        const [a1, a2] = pairs[s];
        const t = (new Date).getTime();
        for(let i = max; --i;) {
            const tmp = findDuplicates(a1, a2);
        }
        console.info(">> 2:", (new Date).getTime() - t);
    });

    it("filter", () => {
        const findDuplicates = (a1, a2) => {
            const a3 = [...a1, ...a2].sort((a,b) => a-b);
            return a3.filter((a,b,c) => {
                // console.info(`>> ${a} - ${b} - ${c}`);
                return (a === a3[b-1]);
            });//.sort();
            // return [1, 4, 13];
        };

        expect(findDuplicates(pairs[0][0], pairs[0][1])).eql([1,4,13]);

        const [a1, a2] = pairs[s];
        const t = (new Date).getTime();
        for(let i = max; --i;) {
            const tmp = findDuplicates(a1, a2);
        }
        console.info(">> 3:", (new Date).getTime() - t);
    });

    it("racing", () => {
        const findDuplicates = (a1, a2) => {
            let [ i1, i2 ] = [ a1.length-1, a2.length-1 ];
            const r = [];

            while (i1 >= 0 || i2 >= 0) {
                if (a1[i1] == a2[i2]) {
                    r.push(a1[i1]);
                    i1--;
                    i2--;
                } else if (a1[i1] > a2[i2]) {
                    i1--;
                } else {
                    i2--;
                }
            }

            return r.reverse();
        };

        expect(findDuplicates(pairs[0][0], pairs[0][1])).eql([1,4,13]);

        const [a1, a2] = pairs[s];
        const t = (new Date).getTime();
        for(let i = max; --i;) {
            const tmp = findDuplicates(a1, a2);
        }
        console.info(">> 4:", (new Date).getTime() - t);

    });

});
