const expect = require('chai').expect;

const makeAJar = coins => {
    const jar = [];
    for (let coin in coins) {
        jar.push(...(new Array(coins[coin]).fill(coin)));
    }
    return jar;
};

const shiffleSort = coins => {
    const res = coins.slice();
    coins.sort(() => Math.random() - 0.5);
    return coins;
}

const shifflePick = coins => {
    const tmp = coins.slice();
    const res = [];
    while (tmp.length > 0) {
        res.push(tmp.splice(Math.random() * tmp.length, 1)[0]);
    }
    return res;
}

const rollEmUp = (jar, rolls) => {
    return Object.keys(jar).map(coin => ({
        coin,
        rolls: jar[coin] / rolls[coin] | 0,
        loose: jar[coin] % rolls[coin]
    }));
};

describe("Coin rolls helper", () => {
    const rolls = {
        1: 50,
        5: 40,
        10: 50,
        25: 40
    };

    it("makeAJar should work", () => {
        // expect(rollEmUp([...]))
        const jar = {1:3, 5:4, 10:2};
        const jarCoins = makeAJar(jar);
        expect(jarCoins).to.eql([ '1', '1', '1', '5', '5', '5', '5', '10', '10' ]);
    });

    it("Randomizer by sort works", () => {
        const arr = [1,2,3,4,5,6,7,8,9];
        const r = shiffleSort(arr);
        console.info(r);
    });

    it("Randomizer by pick works", () => {
        const arr = [1,2,3,4,5,6,7,8,9];
        const r = shifflePick(arr);
        console.info(r);
    });

    it("rollEmUp should work", () => {
        const res = rollEmUp({1:202, 5:169, 10:151}, rolls);
        expect(res).to.eql([
            { coin: '1', rolls: 4, loose: 2 },
            { coin: '5', rolls: 4, loose: 9 },
            { coin: '10', rolls: 3, loose: 1 }
        ]);
    });
});
