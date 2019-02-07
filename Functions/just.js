var expect = require('chai').expect;

describe("Just", () => {
    it("concat", () => {
        expect("".concat('some', 'thing')).to.equal("something");
    });

    it("repeat", () => {
        expect("x".repeat(5)).to.equal("xxxxx");
    });

    it("fill", () => {
        expect(Array(5).fill(5)).to.deep.equal([5,5,5,5,5]);
    });

    it("join", () => {
        expect(Array(5).join("x")).to.equal("xxxx");
    });

    it("Array.from", () => {
        expect(Array.from({length: 5}, () => 1)).to.deep.equal([1,1,1,1,1]);
    });

    it("Cloning an array", () => {
        const arr = [1,3,5,7,9];
        const sliced = arr.slice();
        const expanded = [...arr];
        const fromA = Array.from(arr);
        const copied = arr;
        arr[0] = 10;
        expect(sliced).to.deep.equal([1,3,5,7,9]);
        expect(expanded).to.deep.equal([1,3,5,7,9]);
        expect(fromA).to.deep.equal([1,3,5,7,9]);
        expect(copied).to.deep.equal([10,3,5,7,9]);
    });

    it("comparing objects", () => {
        const arr = [1,3,5,7,9];
        const sec = [...arr];
        expect(JSON.stringify(arr)).to.eq(JSON.stringify(sec));
    });

    it("Object.entries", () => {
        const obj1 = {abc: 2, xyz: "abc"};
        expect(Object.entries(obj1).toString()).to.eq("abc,2,xyz,abc");
    });

    it("indexOf vs includes", () => {
        const str = "conclusion";
        expect(str.indexOf("clu") !== -1).to.eq(true);
    });

    it("truthy", () => {
        [[], {}, '0', 'false', function(){}, -Infinity, new Date()].forEach(v => {
            expect(Boolean(v)).to.eq(true);
        })
    });

    it("falsy", () => {
        [false, undefined, null, NaN, 0, ''].forEach(v => {
            expect(Boolean(v)).to.eq(false);
        })
    });

    it('crocodile', () => {
        expect('🐊'.charCodeAt(0)).to.eq(55357);
        expect('🐊'.charCodeAt(1)).to.eq(56330);
        expect(String.fromCharCode(55357, 56330)).to.eq('🐊');
    });
});
