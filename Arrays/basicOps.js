var expect = require('chai').expect;

describe("Basic array ops", () => {
    const a1 = [1,3,4,8,9];
    const a2 = [2,3,5,8];

    it("Union", () => {
        expect([...new Set([...a1, ...a2])].sort()).eql([1, 2, 3, 4, 5, 8, 9]);
    });

    it("Intersection", () => {
        expect(a1.filter(e => a2.includes(e))).eql([3, 8]);
    });
});

describe("Making an array", () => {
    it("using 'fill'", () => {
        const arr = (Array(5)).fill('x').map((x, i) => i+1);
        expect(arr).to.deep.eq([1, 2, 3, 4, 5]);
    });

    it("using 'from'", () => {
        const arr = Array.from(Array(5), (x, i) => i+1);
        expect(arr).to.deep.eq([1, 2, 3, 4, 5]);
    });
});

describe("randoms", () => {
    it("randomize an array", () => {
        const orig = "abcdefghijk";
        const rnd = [...orig].sort(() => Math.random()-0.5).join("");
        expect(rnd).not.eq(orig);
    });

    it("produce random string", () => {

        const makeToken = length => {
            const mult = +"1".padEnd(length+1, "0");
            return Math.floor(Math.random() * mult).toString().padStart(length, "0");
        }

        const token = makeToken(10);
        expect(token.length).to.eq(10);
        expect(token).not.eq([...""+token].sort().join(""));
    });

});

