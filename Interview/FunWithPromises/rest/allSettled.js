// TODO: make this happen
const fail90percent = x => new Promise((resolve, reject) => Math.random() * 100 < 80 ? reject("ops") : resolve(x*2));
const succeed = x => new Promise(resolve => resolve(x*2));
const fail = () => new Promise((_, reject) => reject("rejected"));

(async () => {
    const promises = [
        succeed(2),
        fail(),
        succeed(3),
        Promise.resolve(555),
    ];
    const results = await Promise.allSettled(promises);
    console.info("results:", results);
})();

(async () => {
    const integers = [1,2,3,4,5,6,7,8,9,10];
    const calculated = {};
    while (Object.keys(calculated).length < integers.length) {
        const ints = [];
        const promises = integers
            .filter(i => ! calculated[i])
            .reduce((acc, i) => { if (acc.length < 3) acc.push(i); return acc; }, [])
            .map(i => { ints.push(i); return fail90percent(i); });
        const results = await Promise.allSettled(promises);
        console.info("results:", results);
        results.forEach((el, i) => {
            if (el.status === "fulfilled") {
                calculated[ints[i]] = el.value;
            }
        });                
    }
    console.info("calculated:", calculated);
})();

// TODO: make homegrown `allSettled` that returns an array
// with elements having three properties – 
// status, value/reason and param
