const expect = require('chai').expect;

describe("solution", () => {
    it("take1", () => {
        const convert = s => 
            s.replace(/-(\w)/g, (tmp, c) => 
                c.toUpperCase()
            )
        ;

        expect(convert("abc")).eql("abc");
        expect(convert("abc-def")).eql("abcDef");
        expect(convert("book-id")).eql("bookId");
        expect(convert("some-long-string")).eql("someLongString");
    });
});
