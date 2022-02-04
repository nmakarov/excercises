const fail = () => new Promise((resolve, reject) => reject("rejected"));
const thro = () => new Promise((resolve, reject) => { throw("thrown"); });

fail()
.then(() => {
    console.info("Can't be here");
})
.catch((e) => {
    console.info("Caught:", e);
});

thro()
.then(() => {
    console.info("Can't be here");
})
.catch((e) => {
    console.info("Caught:", e);
});
