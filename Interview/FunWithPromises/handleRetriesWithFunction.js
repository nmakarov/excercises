// these behave exactly the same in this context:
const fail90percent = x => new Promise((resolve, reject) => Math.random() * 100 < 80 ? reject("ops") : resolve(x*2));
const throw90percent = x => new Promise((resolve, reject) => {
    if (Math.random() * 100 < 80) {
        throw("thrown");
    } else {
        resolve(x*2);
    }
});

const promiseRetry = async (fn, args, retryCountdown, attemptConter=1) => {
    let res;
    try {
        res = await fn.apply(null, args);
        // or, if just one argument – `fn.call(null, arg)`
        return { status: "success", res, count: attemptConter };
    } catch (e) {
        // TODO: check the `e` - it is usally from the fn's reject, or might be something else, like, syntax error
        // TODO: check if the error recoverable or not
        if(retryCountdown <= 0) {
            return { status: "failure", res: null, count: attemptConter };
        } else {
            // TODO: put a setTimeout wrapper around this
            // TODO: progressively increase the delay
            return await promiseRetry(fn, args, retryCountdown-1, attemptConter+1);
        }
    }
};

(async () => {
    // const {status, count, res} = await promiseRetry(fail90percent, [2], 3);
    const {status, count, res} = await promiseRetry(throw90percent, [2], 3);
    if (status === "success") {
        console.info(`${status}, res ${res} after ${count} attempts`);
    } else {
        console.info(`${status} after ${count} attempts`);
    }
})();
