const success = x => Promise.resolve(x*2);
const fail = x => Promise.reject("rejected");

const allSettledHomegrown = promises => {
    const promisesToBeAllSettled = promises.map(promise => {
        return promise
            .then(value => ({ status: "fulfilled", value }))
            .catch(reason => ({ status: "rejected", reason }))
    });
    return Promise.all(promisesToBeAllSettled);
};
(async () => {
    const promises = [
        success(2), fail(), success(4)
    ];
    const allSettledResults = await Promise.allSettled(promises);
    console.info("allSettledResults:", allSettledResults);

    const allSettledHomegrownResults = await allSettledHomegrown(promises);
    console.info("allSettledHomegrownResults:", allSettledHomegrownResults);
})();
