var expect = require('chai').expect;

describe("Find a longest non-repetitive substring", () => {
    const strings = {
        pwwkew: "wke",
        bbbbb: "b",
        abcabcbb: "abc",
    };

    it("Take One", () => {
        const lengthOfLongestSubstring = s => {
            let [ start, end ] = [0, 1];
            let res = [];
            while (end <= s.length) {
                let curr = s.substring(start, end);
                if (curr.length > (new Set(curr)).size) {
                    end = ++start+1;
                } else {
                    res.push(curr);
                    end++;
                }
            }
            const found = res.reduceRight((a, k) => a.length > k.length ? a : k, "");
            return found;
        };

        Object.keys(strings).forEach(k => {
            expect(lengthOfLongestSubstring(k)).to.eq(strings[k])
        });

    });
});
