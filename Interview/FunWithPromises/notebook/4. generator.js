const expect = require("chai").expect;

const strings = [
    "abc",
    "def",
    "xyz"
];

const generator = () => {
    const str = [ ...strings];
    return new Promise((resolve, reject) => {
        const value = str.shift();
        return value ? resolve(value) : reject("no more items");
    });
}

const generatorFunc = () => {
    const str = [ ...strings];
    return () => new Promise((resolve, reject) => {
        const value = str.shift();
        return value ? resolve(value) : reject("no more items");
    });
}


describe("Generator", () => {
    it("Cannot yield strings", async () => {
        const promise = generator();
        expect(await promise).to.equal(strings[0]);
        expect(await promise).to.equal(strings[0]);
        expect(await promise).to.equal(strings[0]);
    });
    it("Can yield strings", async () => {
        const promiseFunc = generatorFunc();
        expect(await promiseFunc()).to.equal(strings[0]);
        expect(await promiseFunc()).to.equal(strings[1]);
        expect(await promiseFunc()).to.equal(strings[2]);
    });

    it("Can yield strings 'till the end using then", async () => {
        const promiseFunc = generatorFunc();

        let i = 0;
        let stop = false;
        while ( ! stop) {
            await promiseFunc().then(
                value => {
                    console.info(">> value:", value);
                    expect(value).to.equal(strings[i++])
                },
                err => {
                    console.info(">> no more items!");
                    expect(err).to.equal("no more items");
                    stop = true
                }
            );
        }
    });

    it("Can yield strings 'till the end using try/catch", async () => {
        const promiseFunc = generatorFunc();

        let i = 0;
        while (true) {
            try {
                const value = await promiseFunc();
                expect(value).to.equal(strings[i++])
            } catch (e) {
                expect(e).to.equal("no more items");
                break;
            }
        }
    });
});
