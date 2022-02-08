const fail90percent = x => new Promise((resolve, reject) => Math.random() * 100 < 80 ? reject("ops") : resolve(x*2));

(async () => {
    const wrap = async x => {
        let res;
        try {
            res = await fail90percent(x);
        } catch (e) {

        }
        return res;
    };

    let res;
    let i = 0;
    do {
        res = await wrap(2);
        i += 1;
    } while ( ! res);

    console.info(`res: ${res} after ${i} attempts`);
})();
