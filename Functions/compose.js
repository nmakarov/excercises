const expect = require('chai').expect;

describe("Compositions", () => {
    it("works", () => {
        const addTwo = x => x + 2;
        const multiplyByThree = x => x * 3;
        const logger = x => console.info(x) || x;
        const logger2 = msg => x => console.info(`${msg}: ${x}`) || x;
        const compose = (...fns) => x => fns.reduce((v, f) => f(v), x);

        expect(addTwo(3)).to.eq(5);
        expect(multiplyByThree(3)).to.eq(9);
        expect(compose(addTwo, multiplyByThree)(5)).to.eq(21);

        expect(compose(
            logger,
            addTwo,
            logger, 
            multiplyByThree,
            logger)(5)).to.eq(21);

        expect(compose(
            logger2("initial"),
            addTwo,
            logger2("after addTwo"), 
            multiplyByThree,
            logger2("after multiplyByThree"))(5)).to.eq(21);
    });
});
