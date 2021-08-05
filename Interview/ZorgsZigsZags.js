const maxZorgs = 1000;
const zorgs = Array.from(new Array(maxZorgs)).map(e => ({zig: 0, zag: 0}));

zorgs.map(z => {
    while (Math.random() > 0.5) {
        z.zig++;
    }
    z.zag++;
});

let zigs = 0;
let zags = 0;
zorgs.map(z => {
    zigs += z.zig;
    zags += z.zag;
});

console.info(zigs, zags);
