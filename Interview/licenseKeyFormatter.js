const expect = require('chai').expect;

/*
You are given a license key represented as a string S which consists only alphanumeric character and dashes. The string is separated into N+1 groups by N dashes.
Given a number K, we would want to reformat the strings such that each group contains exactly K characters, except for the first group which could be shorter than K, but still must contain at least one character. Furthermore, there must be a dash inserted between two groups and all lowercase letters should be converted to uppercase.
Given a non-empty string S and a number K, format the string according to the rules described above.
Example 1:
Input: S = "9B2A-2c-9-y", K = 4
Output: "9B2A-2C9Y"
Explanation: The string S has been split into two parts, each part has 4 characters.
Note that the two extra dashes are not needed and can be removed.
Example 2:
Input: S = "2-7g-6-E", K = 2
Output: "2-7G-6E"
Explanation: The string S has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.
Note:
The length of string S will not exceed 12,000, and K is a positive integer.
String S consists only of alphanumerical characters (a-z and/or A-Z and/or 0–9) and dashes(-).
String S is non-empty.
*/

describe("solution", () => {
    it("take 1", () => {
        const format = (s, k) => {
            const f = s.toUpperCase().replace(/\W/g, "").split("").reverse();
            return f.reduce((r, c, i) => {
                return r + (i%k || !i ? c : `-${c}`);
            }, "").split("").reverse().join("");
        };

        expect(format("9B2A-2c-9-y", 4)).eql("9B2A-2C9Y");
        expect(format("2-7g-6-E", 2)).eql("2-7G-6E");
    });

    it("take 2", () => {
        const format = (s, k) => 
            s
                .toUpperCase()
                .replace(/\W/g, "")
                .split("")
                .reverse()
                .reduce((r, c, i) => 
                    r + (i%k || !i ? c : `-${c}`)
                , "")
                .split("")
                .reverse()
                .join("")
        ;

        expect(format("9B2A-2c-9-y", 4)).eql("9B2A-2C9Y");
        expect(format("2-7g-6-E", 2)).eql("2-7G-6E");
    });
});
