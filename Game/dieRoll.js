/*
takes the following:

3d4
3d4+2
4d4D1 - rolls 4 dies and drops the lowest one
4d4P1 - rolls 4 dies and drops the highest one (penalty of sorts)
2-3
5
*/

const roll = str => {
    str = `${str}`.replace(/\s/g, '');
    if (str.match(/^\d+$/)) {
        return str;
    }
    let matches = str.match(/^(\d+)-(\d+)$/);
    if (matches && matches[1] && matches[2] ) {
        const diff = matches[2]-matches[1]+1;
        return Math.floor(Math.random()*diff) + +matches[1];
    }
    matches = str.match(/^(\d+)d(\d+)(?:D(\d+)){0,1}(?:\+(\d+)){0,1}$/);
    if (matches) {
        const [ orig, dices, faces, drops=0, adds=0 ] = matches;
        // console.info(`dices:${dices}, faces:${faces}, adds:${adds}`);

        const [ min, diff ] = [ +dices, +dices * +faces ];

        return ('a'.repeat(dices).split('')).reduce(c => {
            const r = Math.ceil(Math.random()*faces);
            const rr = c + r;
            // console.info(">> try", rr)
            return rr;
        }, 0) + +adds;

        // return Math.ceil(Math.random()*diff);// + min + +adds;
    }
    console.info(matches);
}

const rolls = (str, number) => {
    const res = {};
    for (let i = 0; i < number; i++) {
        const r = roll(str);
        res[r] = res[r] ? res[r]+1 : 1;
    }
    return res;
}

const printBars = stats => {
    const spaces = [ 3, 7, 80 ];
    const max = Object.values(stats).reduce((a, e) => e>a ? e: a, 0);
    Object.keys(stats).forEach(s => {
        let a1 = ' '.repeat(spaces[0] - s.length) + s;
        let a2 = ' '.repeat(spaces[1] - stats[s].toString().length) + stats[s];
        let a3 = '  ' + 'X'.repeat(stats[s]/max*spaces[2]);
        console.info(a1, a2, a3);
    });
}

const rollAndPrint = str => {
    const r = rolls(str, 50000);
    console.info("rolling", str);
    printBars(r);
    console.info("----------------");
}


rollAndPrint("2-4");
rollAndPrint("3d4");
rollAndPrint("5d5");
