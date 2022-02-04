const { Miner } = require("./MinerClass");

const simpleRun = async () => {
    const miner1 = new Miner();
    console.info("miner1 attempt:", await miner1.mine());
    const miner2 = new Miner({ minDelay: 500, maxDelay: 1000 });
    console.info("miner2 attempt:", await miner2.mine());
};

const minerWrapper = async miner => {
    let start = Date.now();
    let coins = 0;
    let failures = 0;
    do {
        try {
            coins = await miner.mine();
        } catch(e) {
            failures += 1;
        }
    } while (coins === 0);
    return { coins, failures, elapsed: Date.now() - start };
};

const mine100CoinsSequentially = async miner => {
    let [ coins, failures, attempts, elapsed ] = [0,0,0,0];
    do {
        attempts += 1;
        res = await minerWrapper(miner);
        coins += res.coins;
        failures += res.failures;
        elapsed += res.elapsed;
        console.info(`    >> mined ${coins} coins.`);
    } while (coins < 100);
    return { coins, failures, attempts, elapsed };
};

const mine100CoinsConcurrently = async (miner, threadCount) => {
    let [ coins, failures, attempts, start ] = [0,0,0,Date.now()];
    do {
        attempts += 1;
        const promises = new Array(threadCount).fill(1).map(() => miner.mine());
        const results = await Promise.allSettled(promises);

        coins += results.filter(r => r.status === "fulfilled").reduce((acc, r) => acc + r.value, 0);
        failures += results.filter(r => r.status === "rejected").length;
        attempts += threadCount;
        console.info(`    >> mined ${coins} coins.`);
    } while (coins < 100);
    return { coins, failures, attempts, elapsed: Date.now() - start };
};

// TODO: next step: do not make extra calls if we collected enough coins already
// TODO: then work with several miners simultaneously

(async () => {
    // await simpleRun();
    // const miner = new Miner({ failRate: 50, minDelay: 500, maxDelay: 2000, printMinedCoins: true, maxCoins: 20 });
    const miner = new Miner({ failRate: 50, minDelay: 500, maxDelay: 2000, printMinedCoins: true });
    // console.info("miner attempt:", await minerWrapper(miner));
    // console.info("mine100CoinsSequentially:", await mine100CoinsSequentially(miner));
    console.info("mine100CoinsConcurrently:", await mine100CoinsConcurrently(miner, 4));
})();
