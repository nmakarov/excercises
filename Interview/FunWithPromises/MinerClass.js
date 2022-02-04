class Miner {
    constructor (params={}) {
        this.failRate = params.failRate || 0;
        this.delay = params.delay;
        this.maxDelay = params.maxDelay || 1;
        this.minDelay = params.minDelay || 1;
        this.maxCoins = params.maxCoins || Number.MAX_SAFE_INTEGER;
        this.printMinedCoins = params.printMinedCoins;
        this.activeThreads = 0;
        this.minedSoFar = 0;
    }
    async mine () {
        return new Promise((resolve, reject) => {
            this.activeThreads += 1;
            const delay = this.delay ? this.delay : Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
            setTimeout(() => {
                this.activeThreads -= 1;
                if (Math.random() * 100 < this.failRate) {
                    reject("rejected");
                } else {
                    let coins = (Math.floor(Math.random() * 10));
                    if (this.minedSoFar + coins > this.maxCoins) {
                        coins = this.maxCoins - this.minedSoFar;
                    }
                    if (this.printMinedCoins) {
                        if (coins === 0) {
                            console.info(`        miner has no more coins`);
                        } else {
                            console.info(`        miner found ${coins} coins`);
                        }
                    }
                    this.minedSoFar += coins;
                    resolve(coins);
                }
            }, delay);
        });
    }
};

module.exports = {
    Miner,
};
