const expect = require('chai').expect;

describe("Tests", () => {
    it("Shallow spread", () => {
        const obj1 = {
            a: 1,
            b: {
                c: 2,
            }
        };
        const obj2 = { ...obj1 };
        obj2.b.c = 3;
        expect(obj1.b.c === 2).eq(false);
    });

    it("Shallow copy", () => {
        const obj1 = {
            a: 1,
            b: {
                c: 2,
            }
        };
        const obj2 = Object.assign({}, obj1);
        obj2.b.c = 3;
        expect(obj1.b.c === 2).eq(false);
    });

    it("Arrays", () => {
        const arr1 = "abc".split("");
        expect(arr1).eql(["a", "b", "c"]);

        const arr2 = arr1.reverse();
        arr2.push("new");
        expect(arr1).not.eql(["a", "b", "c"]);
        expect(arr1).eql(["c", "b", "a", "new"]);
    });
});