const t = +(new Date);
debugger;
for (let i = 1; i <= 10; i++) {
    console.info("now i is", i);
}
const t1 = +(new Date) - t;
console.info("diff:", t1);
