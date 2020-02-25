const expect = require("chai").expect;

const conv = {
    "1000": "M",
    "900": "CM",
    "500": "D",
    "400": "CD",
    "100": "C",
    "90": "XC",
    "50": "L",
    "40": "XL",
    "10": "X",
    "9": "IX",
    "5": "V",
    "4": "IV",
    "1": "I"
}
const int2roman = number => {
    let n = number;
    let roman = "";
    Object.keys(conv).sort((a,b) => +b - +a).map((k, i) => {
        // console.info(`>> trying multiplier "${k}"`)
        while (n >= +k) {
            roman += conv[k];
            n -= +k
        }
    })
    return roman;
}

describe("Conversions", () => {
    it("Integer to Roman", () => {
        expect(int2roman(3)).eql("III");
        expect(int2roman(5)).eql("V");
        expect(int2roman(6)).eql("VI");
        expect(int2roman(2345)).eql("MMCCCXLV");
        expect(int2roman(2020)).eql("MMXX");
    });
    
});
