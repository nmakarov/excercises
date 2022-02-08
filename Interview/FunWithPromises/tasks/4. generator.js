const expect = require("chai").expect;

const strings = [
    "abc",
    "def",
    "xyz"
];

const generator = () => {}; // <---

describe("Generator", () => {
    it("Can yield strings", async () => {
        const promise = generator();

        expect(await promise()).to.equal(strings[0]);
        expect(await promise()).to.equal(strings[1]);
        expect(await promise()).to.equal(strings[2]);
    });

    it("Can yield strings 'till the end using then", async () => {
        const promise = generator();
    });
});
