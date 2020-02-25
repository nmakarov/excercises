const expect = require("chai").expect;

describe("Tricks", () => {
    it("is it a primitive?", () => {
        const isPrimitive = v => Object(v) !== v;
        var undef;
        const obj = {a:1};
        const str = "abc";
        expect(isPrimitive("abc")).eql(true);
        expect(isPrimitive(str)).eql(true);
        expect(isPrimitive(123)).eql(true);
        expect(isPrimitive(null)).eql(true);
        expect(isPrimitive(undef)).eql(true);
        expect(isPrimitive(true)).eql(true);

        expect(isPrimitive(/.*/)).eql(false);
        expect(isPrimitive(new RegExp(".*"))).eql(false);
        expect(isPrimitive(obj)).eql(false);
    });

    it("Pure object", () => {
        const obj1 = {};
        const obj2 = Object.create(null);
    })
});
