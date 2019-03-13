const expect = require('chai').expect;

const pickADoor = (notThese = []) => {
    let door;
    do {
        door = Math.floor(Math.random()*3);
    } while (notThese.includes(door));
    return door;
}
const monty = () => {
    const prize = pickADoor();
    const pointed = pickADoor();
    const opened = pickADoor([prize, pointed]);
    const changed = pickADoor([pointed, opened]);

    // console.info(`>> pointed: ${pointed === prize}, changed: ${prize === changed}`);
    return changed === prize;
};

monty();
monty();
monty();
monty();
monty();
monty();

describe("Monty Hall problem", () => {
    it("Pick-a-door works correctly with one door disabled", () => {
        const iters = 100;
        const doors = Array(iters)
            .fill('x')
            .map(() => pickADoor([1]))
            .reduce((res, d) => {
                res[d] = res[d]+1 || 1;
                return res;
            }, {});
        expect(doors[1]).to.be.undefined;
    });

    it("Pick-a-door works correctly with two doors disabled", () => {
        const iters = 100;
        const doors = Array(iters)
            .fill('x')
            .map(() => pickADoor([1, 2]))
            .reduce((res, d) => {
                res[d] = res[d]+1 || 1;
                return res;
            }, {});
            expect(doors[1]).to.be.undefined;
            expect(doors[2]).to.be.undefined;
    });

    it("Run simulation", () => {
        const iters = 1000;
        const wins = Array(iters)
            .fill('x')
            .map(() => monty())
            .reduce((res, winner) => res + (winner ? 1 : 0), 0);
        expect(wins).to.be.greaterThan(iters/2);
    });
});
