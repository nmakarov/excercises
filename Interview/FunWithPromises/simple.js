const multiply = x => new Promise(resolve => resolve(x*2));
const fail90percent = x => new Promise((resolve, reject) => {
    const failChance = Math.random() * 100 < 50;
    return failChance ? reject("ops") : resolve(x*2);
});

(async () => {
    console.info(await multiply(2));
})();

(async () => {
    const results = await Promise.all([
        multiply(2),
        multiply(3),
        multiply(4),
    ]);
    console.info("results:", results);
})();

// (async () => {
//     // yields "UnhandledPromiseRejection"
//     console.info("fail90percent:", await fail90percent(2));
// })();

(async () => {
    let res;
    try {
        res = await fail90percent(2);
    } catch (e) {
        res = "failed";
    }
    console.info("fail90percent:", res);
})();

