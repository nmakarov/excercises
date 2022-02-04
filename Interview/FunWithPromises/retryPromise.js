class EventuallyResolvedPromise {
    constructor (fails) {
        this.fails = fails;
    }

    async multiply (x) {
        console.info(">> this.fails:", this.fails);
        return this.fails--
            ? Promise.reject("not ready yet")
            : Promise.resolve(x * 2);
    }
}

const fail90percent = x => new Promise((resolve, reject) => Math.random() * 100 < 80 ? reject("ops") : resolve(x*2));

const promiseRetry = async (promise, tries) => {
    try {
        return await promise();
    } catch (e) {
        console.info(">> failed for now:", e);
        return tries === 0 ? Promise.reject(e) : promiseRetry(promise, tries-1);
    }
};

(async () => {
    // const promise = new EventuallyResolvedPromise(3);

    // this one stuck
    // const promise = fail90percent(3)
    // this one works, but inside promiseRetry a mod has to be made -
    // `()` at the end of the `return await promise`
    const promise = () => fail90percent(3)

    try {
        const result = await promiseRetry(promise, 50);
        console.info(">> result:", result);
    } catch (e) {
        console.info(">> no result:", e);
    }
})();
