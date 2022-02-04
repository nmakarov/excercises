// const resP = async (name, time) => new Promise((resolve) => setTimeout(() => resolve(`${name} resolved`), time));
const resP = (name, time) => new Promise((resolve) => setTimeout(() => resolve(`${name} resolved`), time));
const aResP = async (name, time) => new Promise((resolve) => setTimeout(() => resolve(`${name} resolved`), time));
// const aRes = async (name, time) => (() { setTimeout(() => `${name} resolved`, time) })();
const rejP = (name, time) => new Promise((_, reject) => setTimeout(() => reject(`${name} rejected`), time));
const thr = async (name, time) => new Promise((_, reject) => setTimeout(() => { throw `${name} thrown`; }, time));

const easyStuff = async () => {
    const ra1 = await resP("a", 1);
    console.info(">> ra1:", ra1);

    const ra2 = await aResP("a", 1);
    console.info(">> ra2:", ra2);

    // const ra3 = await aRes("a", 1);
    // console.info(">> ra3:", ra3);

    try {
        const r2 = await rejP("b", 1);
        console.info(">> r2:", r2);
    } catch (e) {
        console.info(">> caught:", e);
    }
    const r3 = await rejP("c", 1).catch(a => {
        console.info(">> caught r3:", a);
        return `return from catch for "${a}"`;
    });
    console.info(">> r3:", r3);
};

const somePromisesFailed = async () => {
    const rAll = await Promise.all([
        resP("a1", 10),
        rejP("a2", 4),
        rejP("a3", 3)
    ]).catch(e => {
        console.info(">> something is caught:", e);
        return "something definitely failed";
    });
    console.info(">> some should fail:", rAll);
};

(async () => {
    await easyStuff();
    await somePromisesFailed();

    const rAll = await Promise.all([ resP("a1", 10), resP("a2", 2), resP("a3", 3) ]);
    console.info(">> rAll:", rAll);


    // const r4 = await thr("d", 1).catch(a => {
    //     console.info(">> caught r4:", a);
    //     return `return from catch for "${a}"`;
    // });
    // console.info(">> r4:", r4);
    
    // try {
    //     const r5 = await thr("e", 1);
    //     console.info(">> r5:", r2);
    // } catch (e) {
    //     console.info(">> r5 caught:", e);
    // }

    console.info("end.");
})();
