const expect = require("chai").expect;

const getType = p => 
    p === undefined ? "undefined" :
    p === null ? "null" :
    p.constructor.name.toLowerCase();

const is = (v, t) => 
    ![, null].includes(v) && v.constructor === t;

const head = a => a[0];

const tail = a => a.length > 1 ? a.slice(1) : a;

const intersection = (a,b) => {
    const bb = new Set(a);
    return b.filter(x => bb.has(x));
};

const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);
  
const toDecimalMark = num => num.toLocaleString('en-US');

const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;

const splitWords = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);

const digitize = n => [...`${n}`].map(i => parseInt(i));

describe("Useful functions", () => {
    it("getType", () => {
        var undef;
        const nul = null;
        const arr = [1,2,3];
        const obj = {a:1};
        const s = "abc";

        expect(getType(undef)).eql("undefined");
        expect(getType(nul)).eql("null");
        expect(getType(arr)).eql("array");
        expect(getType(obj)).eql("object");
        expect(getType(s)).eql("string");
    });

    it("is", () => {
        expect(is(1, Number)).eql(true);
        expect(is("a", String)).eql(true);
        expect(is(1, String)).eql(false);
        expect(is(/\d+/, RegExp)).eql(true);
    });

    it("head", () => {
        expect(head([1,2,3])).eql(1);
    });
    
    it("tail", () => {
        expect(tail([1,2,3])).eql([2,3]);
    });
    
    it("intersection", () => {
        expect(intersection([1,2,3], [2,3,4])).eql([2,3]);
    });

    it("Currency formatting", () => {
        expect(toCurrency(123456.789, 'EUR')).eql('€123,456.79');
        expect(toCurrency(123456.789, 'USD', 'en-us')).eql('$123,456.79');
        expect(toCurrency(123456.789, 'USD', 'fa')).eql('$123,456.79');
        expect(toCurrency(322342436423.2435, 'JPY')).eql('¥322,342,436,423');
        expect(toCurrency(322342436423.2435, 'JPY', 'fi')).eql('¥322,342,436,423');
    });

    it("Decimal mark", () => {
        expect(toDecimalMark(12305030388.9087)).eql('12,305,030,388.909');
    });

    it("Validate number", () => {
        expect(validateNumber('10')).eql(true);
    });

    it("Split words", () => {
        expect(splitWords("This: is a sentence, with comma!")).eql([
            "This",
            "is",
            "a",
            "sentence",
            "with",
            "comma"
        ]);
    });
    
    it("Digitize", () => {
        expect(digitize(135)).eql([1, 3, 5]);
    });
});
