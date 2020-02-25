const expect = require("chai").expect;

const walkUp  = (arr1, arr2) => {
    const [a1, a2] = [arr1, arr2].map(arr => arr.split(/,\s*/));
    let [i, j] = [0, 0];
    const inter = [];
    let [iMax, jMax] = [a1.length, a2.length];
    while (i<iMax && j<jMax) {
        const [a,b] = [+a1[i], +a2[j]];
        if(a == b) {
            inter.push(a);
            i++;
            j++;
        } else if (a > b) {
            j++;
        } else {
            i++;
        }
    }
    return inter.join(", ");
}

const withSets = (arr1, arr2) => {
    const [a1, a2] = [arr1, arr2].map(arr => new Set(arr.split(/,\s*/)));
    const inter = [...a1].filter(x => a2.has(x));
    return inter.join(", ");
}

const arrs = [
    {
        arr1: "1, 3, 4, 7, 15",
        arr2: "1, 2, 4, 15, 21",
        result: "1, 4, 15",
    },
    {
        arr1: "1, 3, 9, 10, 17, 18",
        arr2: "1, 4, 9, 10",
        result: "1, 9, 10",
    },    
];

describe("Intersections", () => {
    it("walkUp", () => {
        expect(walkUp(arrs[0].arr1, arrs[0].arr2)).eql(arrs[0].result);
        expect(walkUp(arrs[1].arr1, arrs[1].arr2)).eql(arrs[1].result);
    });

    it("withSets", () => {
        expect(withSets(arrs[0].arr1, arrs[0].arr2)).eql(arrs[0].result);
        expect(walkUp(arrs[1].arr1, arrs[1].arr2)).eql(arrs[1].result);
    });

    
});
