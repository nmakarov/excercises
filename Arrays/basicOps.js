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
