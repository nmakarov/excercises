const expect = require('chai').expect;

describe("getRange", () => {
    it("take 1", () => {
        const getRange = arr => {
            let prev = arr[0];
            let str = `${prev}`;
            let intervalStarted = false;
            let curr = null;
            for (let i = 1; i < arr.length; i++) {
                curr = arr[i];
                if (curr === prev + 1) {
                    if ( ! intervalStarted) {
                        intervalStarted = true;
                    }
                } else {
                    if (intervalStarted) {
                        str += `-${prev},${curr}`;
                        intervalStarted = false;
                    } else {
                        str += `,${curr}`;
                    }
                }
        
                prev = curr;
            }
        
            if (intervalStarted) {
                str += `-${curr}`;
            }
        
            return str;
        }
        
        expect(getRange([0, 1, 2, 3, 4, 7, 8, 10])).eq("0-4,7-8,10");
        expect(getRange([4, 7, 10])).eq("4,7,10");
        expect(getRange([2, 3, 8, 9])).eq("2-3,8-9");
    });

    it("take 2 (needs work)", () => {
        const getRange = arr => arr.reduce((str, e, i, a) =>
            i === 0 ? e :
            e === a[i-1]+1 ?
                e === a[i+1]-1 ? 
                    str[str.length-1] === "-" ?
                        `${str}` :
                        `${str}-` :
                    `${str}${e}` :
                `${str},${e}`
        , "");

        console.info('>>', getRange([4, 7, 10]));
        console.info('>>', getRange([0, 1, 2, 3, 4, 7, 8, 10]));
        console.info('>>', getRange([2, 3, 8, 9]));
    });
    
});
