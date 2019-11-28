const expect = require('chai').expect;

describe("Various snippets", () => {
    it("get type", () => {
        const t = v => {
            return v === undefined ? "undefined" :
                v === null ? "null" :
                v.constructor.name.toLowerCase();
        }

        expect(t("aaa")).eq("string");
        expect(t([1, 2, 3])).eq("array");
        expect(t(123)).eq("number");
        expect(t(null)).eq("null");
        expect(t({a: 1})).eq("object");
        const a = new Date;
        expect(t(a)).eq("date");
    });
    
    it("indexes", () => {
        const indexes = (a, n) => a.reduce((acc, el, i) => el === n ? [...acc, i] : acc, []);
        expect(indexes([1,2,3], 2)).eql([1]);
        expect(indexes([1,2,3], 4)).eql([]);
        expect(indexes([1,2,3,1,2,3], 2)).eql([1,4]);
    });
});
