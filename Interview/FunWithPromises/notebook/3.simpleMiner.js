const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

// TODO:
// minerFunctionPromise vs. minerPromise
const Miner = (successRate=100) => {
    return () => new Promise((resolve, reject) => {
        const chance = Math.random() * 100;
        if (chance < successRate) {
            console.info(">> chance is good enough:", chance);
            // resolve(1);
            setTimeout(() => resolve(1), 1);
        } else {
            console.info(">> chance is too low:", chance);
            // reject(`nothing is mined: ${chance}`);
            setTimeout(() => reject(`nothing is mined: ${chance}`), 1);
        }
    });
};

// const promiseRetry = async (promise, tries) => {
//     try {
//         return await promise();
//     } catch (e) {
//         console.info(">> failed for now:", e);
//         return tries === 0 ? Promise.reject(e) : promiseRetry(promise, tries-1);
//     }
// };

const promiseRetry = async promise => {
    try {
        return await promise();
    } catch (e) {
        return promiseRetry(promise);
    }
};


// TODO: find out why this one doesn't work:
// const retryPromise = promise => {
//     try {
//         return promise();
//     } catch (e) {
//         console.info(">> caught:", e);
//         return retryPromise(promise);
//     }
// };

describe("Mining", () => {
    xit("Can mine each time with 100% success rate", async () => {
        const miner = Miner();
        expect(await miner()).to.equal(1);
        expect(miner()).to.eventually.equal(1);
    });

    xit("Can surely mine 10 coins the wrong way", async () => {
        const mine10coins = async miners => {
            let coins = 0;
            miners.forEach(async miner => {
                coins += await miner();
            });
            return coins;
        };

        const miners = [];
        for (let i = 1; i <= 10; i++) {
            miners.push(Miner(100));
        }
        const coins = await mine10coins(miners);
        expect(coins).to.not.equal(10);
    });

    xit("Can surely mine 10 coins the right way", async () => {
        const mine10coins = async miners => {
            let coins = 0;
            for (let i = 0; i < miners.length; i++) {
                const miner = miners[i];
                coins += await miner();
            }
            return coins;
        };
        const miners = [];
        for (let i = 1; i <= 10; i++) {
            miners.push(Miner(100));
        }
        const coins = await mine10coins(miners);
        expect(coins).to.equal(10);
    });

    xit("Can surely mine 10 coins the right way using forEachAsync", async () => {
        const forEachAsync = async (arr, fn) => {
            for (let el of arr) {
                await fn(el);
            }
        }

        const miners = [];
        for (let i = 1; i <= 10; i++) {
            miners.push(Miner(100));
        }

        let coins = 0;
        await forEachAsync(miners, async miner => {
            coins += await miner();
        });

        expect(coins).to.equal(10);
    });

    xit("Can eventually mine something (expect promise)", async () => {
        const miner = Miner(5);
        expect(promiseRetry(miner)).to.eventually.equal(1);
    });

    xit("Can eventually mine something (expect value)", async () => {
        const miner = Miner(5);
        expect(await promiseRetry(miner)).to.equal(1);
    });

    xit("Can eventually mine 10 coins", async () => {
        const mine10coins = async miner => {
            let coins = 0;
            while (coins < 10) {
                coins += await promiseRetry(miner);
            }
            return coins;
        };
        const miner = Miner(5);
        const coins = await mine10coins(miner);
        expect(coins).to.equal(10);
    });

    it("Can fail if one of the promises failed", async () => {
        const miners = [];
        miners.push(Miner(100)());
        for (let i = 1; i <= 8; i++) {
            miners.push(Miner(50)());
        }
        miners.push(Miner(0));

        try {
            const results = await Promise.all(miners);
            console.info(">> results:", results);
        } catch (e) {
            console.info(">> error:", e);
        }
    });

    // can not fail if some promises failed (return all results - successful or not)
});