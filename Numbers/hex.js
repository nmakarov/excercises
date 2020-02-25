const expect = require('chai').expect;

describe("hex works", () => {
    const hex = 0x124a;
    const hexStr = "124a";

    it("convert to strings", () => {
        expect(hex.toString()).eql("4682");
        expect(hex.toString(10)).eql("4682");
        expect(hex.toString(16)).eql("124a");
    });

    it("convert to value", () => {
        expect(parseInt(hexStr, 16)).eql(4682);
    });

    it("math", () => {
        const add = (h1, h2) => {
            let r = (parseInt(h1, 16) + parseInt(h2, 16)).toString(16);
            while(r.length < Math.max(h1.length, h2.length)) {
                r = "0" + r;
            }
            return r;
        }

        const substract = (h1, h2) => {
            let r = (parseInt(h1, 16) - parseInt(h2, 16)).toString(16);
            while(r.length < Math.max(h1.length, h2.length)) {
                r = "0" + r;
            }
            return r;
        }

        expect(add("1a", "1")).eql("1b");
        expect(add("00ff00", "ff00ff")).eql("ffffff");
        expect(add("00ff00", "0000ff")).eql("00ffff");

        expect(substract("a1a1a1", "010101")).eql("a0a0a0");

    });
});
