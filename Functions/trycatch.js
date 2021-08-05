const alwaysSuccess = () => new Promise((res, rej) => setTimeout(res, 1));
const alwaysFail = () => new Promise((res, rej) => setTimeout(rej, 1));

const failWrapper = () => {
    setTimeout(async () => {
        try {
            await alwaysFail();
        } catch (e) {
            console.info("failed indeed.");
        }
    }, 0);
}

const adapter = async () => {
    console.info(">> 1.");
    await alwaysSuccess();
    console.info(">> 2.");
    // try {
    //     await alwaysFail();
    // } catch (e) {

    // }
    console.info(">> 3.");
    const res = alwaysFail();
    console.log("res::", res)
    // await alwaysFail();
    console.info(">> 4.");
    return res;
};

const outer = async () => {
    try {
        const data = await alwaysSuccess();
        console.log('data::', data)
        try {
            failWrapper();
        } catch (e) {
            console.info(">> inner catch");
        }
    } catch (e) {
        console.info(">> outer catch:", e);
    }
};

const outerOuter = async () => {
    await outer();
}

outerOuter();