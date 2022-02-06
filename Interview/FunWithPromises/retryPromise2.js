const promiseResolved4thTry = () => {
    let tries = 0;
    return () => {
        return new Promise((resolve, reject) => {
            if (++tries === 4) {
                resolve("resolved");
            } else {
                reject(`try #${tries} rejected`);
            }
        })
    };
};

const promiseResolved4thTryStuck = () => {
    let tries = 0;
    return new Promise((resolve, reject) => {
        if (++tries === 4) {
            resolve("resolved");
        } else {
            reject(`try #${tries} rejected`);
        }
    })
};


(async ()=> {
    const promise1 = promiseResolved4thTry();
    let results = await Promise.allSettled([
        promise1(),
        promise1(),
        promise1(),
        promise1(),
    ]);
    console.info(">> results1:", results);
    const promise2 = promiseResolved4thTryStuck();
    results = await Promise.allSettled([
        promise2,
        promise2,
        promise2,
        promise2,
    ]);
    console.info(">> results2:", results);
})();
