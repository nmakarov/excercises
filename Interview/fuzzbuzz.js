const expect = require('chai').expect;

const calcResults = entries => {
    let [ fuzz, buzz, fuzzbuzz, sum ] = [ 0, 0, 0, 0 ];
    entries.forEach(entry => {
        if (entry === "fuzz") {
            fuzz += 1;
        } else if (entry === "buzz") {
            buzz += 1;
        } else if (entry === "fuzzbuzz") {
            fuzzbuzz += 1;
        } else {
            sum += entry;
        }
    });
    return [ fuzz, buzz, fuzzbuzz, sum ];
};

const compare = (arr1, arr2) => {
    return arr1.reduce((acc, el, i) => acc && arr2[i] === el, true);
};

const fuzzbuzz1 = max => {
    results = [];
    for (let i = 1; i <= max; i++) {
        const entry =
            i % 15 === 0 ? "fuzzbuzz" :
            i % 5 === 0 ? "buzz" :
            i % 3 === 0 ? "fuzz" :
            i;
        results.push(entry);
    }
    return results;
};

const fuzzbuzz2 = max => {
    let [ threes, fifths ] = [ 0, 0 ];
    results = (new Array(max)).fill(0).map((tmp, i) => i + 1).map(i => {
        threes = threes >= 2 ? 0 : threes + 1;
        fifths = fifths >= 4 ? 0 : fifths + 1;
        return (
            fifths === 0 && threes === 0 ? "fuzzbuzz" :
            fifths === 0 ? "buzz" :
            threes === 0 ? "fuzz" :
            i
        );
    });
    return results;
};

describe("fuzzbuzz challenge", () => {
    let pivot = {
        "100": calcResults(fuzzbuzz1(100))
    };
    it("first", () => {
        const entries = fuzzbuzz1(100);
        // console.info(entries);
        const results = calcResults(entries);
        expect(compare(results, pivot["100"])).to.eq(true);
    });

    it("second", () => {
        const entries = fuzzbuzz2(100);
        // console.info(entries);
        const results = calcResults(entries);
        expect(compare(results, pivot["100"])).to.eq(true);
    });
});