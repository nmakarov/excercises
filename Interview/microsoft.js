const expect = require('chai').expect;

describe("1", () => {
/*
Write a function solution that, given a string S of N lowercase English letters, returns a string with no instances of three identical consecutive letters, obtained from S by deleting the minimum possible number of letters.
Examples:
Given S = “eedaaad” , the function should return “eedaad” . One occurrence of letter a is deleted.
Given S = “xxxtxxx” , the function should return “xxtxx” . Note that letter x can occur more than three times in the returned string, if the occurrences are not consecutive.
Given S = “uuuuxaaaaxuuu” , the function should return “uuxaaxuu”.
Write an efficient algorithm for the following assumptions:
N is an integer within the range [1..200,000]
string S consists only of lowercase letters (a-z)
*/
    it ("straightforward", () => {
        const solution = str => {
            let last = '';
            let secondlast = '';
            let ret = '';
            for(const c of str) {
                if (c !== last) {
                    ret += c;
                } else if (c !== secondlast) {
                    ret += c;
                }
                [secondlast, last] = [last, c];
            }
            return ret
        }
        expect(solution("eedaaad")).eql("eedaad");
        expect(solution("xxxtxxx")).eql("xxtxx");
        expect(solution("uuuuxaaaaxuuu")).eql("uuxaaxuu");
    });
});

describe("2", () => {
/*
Write a function solution that, given an array A consisting of N integers, returns the maximum sum of two numbers whose digits add up to an equal sum. If there are no two numbers whose digits have an equal sum, the function should return -1.
Examples:
Given A = [51, 71, 17, 42], the function should return 93. There are two pairs of numbers whose digits add up to an equal sum: (51, 42) and (17, 71). The first pair sums up to 93.
Given A = [42, 33, 60], the function should return 102. The digits of all the numbers in A add up to the same sum, and choosing to add 42 and 60 gives the result 102.
Given A = [51, 32, 43], the function should return -1, since all numbers in A have digits that add up to different, unique sums.
Write an efficient algorithm for the following assumptions:
N is an integer within the range [1..200,000]
each element of array A is an integer within the range [1..1,000,000,000]
*/
    
});

describe("2", () => {
/*
You are given a string S consisting of N letters ‘a’ and/or ‘b’. In one move, you can swap one letter for the other (‘a’ for ‘b’ or ‘b’ for ‘a’).
Write a function solution that, given such a string S, returns the minimum number of moves required to obtain a string containing no instances of three identical consecutive letters.
Examples:
Given S = “baaaaa” , the function should return 1. The string without three identical consecutive letters which can be obtained in one move is “baabaa”.
Give S = “baaabbaabbba” , the function should return 2. There are four valid strings obtainable in two moves: for example, “bbaabbaabbaa” .
Given S = “baabab” , the function should return 0.
Write an efficient algorithm for the following assumptions:
N is an integer within the range [0..200,000]
string S consists only of the characters ‘a’ and/or ‘b’
*/
    
});
    
