const promise = new Promise(resolve => {
    console.info(">> inside a promise");
    resolve();
});

console.info(">> script start");

