// data sets: https://people.sc.fsu.edu/~jburkardt/datasets/knapsack_01/knapsack_01.html

const expect = require('chai').expect;

const sets = {
    p01: {
        capacity: 165,
        weights: [ 23, 31, 29, 44, 53, 38, 63, 85, 89, 82 ],
        profits: [ 92, 57, 49, 68, 60, 43, 67, 84, 87, 72 ],
        optimal: [ 1, 1, 1, 1, 0, 1, 0, 0, 0, 0 ],
    },
    p02: {
        capacity: 26,
        weights: [ 12, 7, 11, 8, 9 ],
        profits: [ 24, 13, 23, 15, 16 ],
        optimal: [ 0, 1, 1, 1, 0 ],
    },
    p08: {
        capacity: 6404180,
        weights: [ 382745, 799601, 909247, 729069, 467902, 44328, 34610, 698150, 823460, 903959, 853665, 551830, 610856, 670702, 488960, 951111, 323046, 446298, 931161, 31385, 496951, 264724, 224916, 169684 ],
        profits: [ 825594, 1677009, 1676628, 1523970, 943972, 97426, 69666, 1296457, 1679693, 1902996, 1844992, 1049289, 1252836, 1319836, 953277, 2067538, 675367, 853655, 1826027, 65731, 901489, 577243, 466257, 369261 ],
        optimal: [ 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1 ],
    }
};

const permutations01 = (l) => {
    if (l === 1) {
        return ["0", "1"];
    } else {
        const less = permutations01(l-1);
        const r = [];
        less.forEach(p => {
            r.push(`0${p}`);
            r.push(`1${p}`);
        });
        return r;
    }
}

const take = ({weights, profits, perm}) => {
    const r = [0, 0, perm];
    for (let i=0; i<perm.length; i++) {
        // console.info(perm.charAt(i));
        if(perm.charAt(i) === "1") {
            r[0] += weights[i];
            r[1] += profits[i];
        }
    }
    return r;
};

const straightforward = ({ capacity, weights, profits }) => {
    const perms = permutations01(weights.length);
    const r = [];
    console.info(">> perms length:", perms.length);
    perms.forEach(perm => {
        const t = take({weights, profits, perm});
        if (t[0] <= capacity) {
            r.push(t);
        }
    });
    const res = r.reduce((acc, pair) => pair[1] > acc[1] ? pair : acc, [0, 0]);
    return res[2];
}

// items: [{ weight, profit }, ...]
const recursive = ({ items, capacity }, level = 0, inset = []) => {
    const selected = [];
    for(let i = 0; i<items.length; i++) {
        const item =  items[i];
        const rest = items.slice(i+1);
        console.info(`>>       ${level}/${i}: inspecting item ${item.weight}, rest weights: ${rest.map(i => i.weight)}`);
        if (item.weight < capacity) {
            const bestOfRest = recursive({ items: rest, capacity: capacity-item.weight}, level+1, [...inset, item.weight]);
            if (bestOfRest) {
                selected.push({ weight: item.weight + bestOfRest.weight, profit: item.profit + bestOfRest.profit, items: [...inset, item.weight, ...bestOfRest.items] });
            } else {
                selected.push({ weight: item.weight, profit: item.profit, items: [...inset, item.weight] });
            }
        }
    }

    if (selected.length > 0) {
        res = selected.reduce((acc, i) => (acc.profit > i.profit ? acc : i), { weight: 0, profit: 0, items: []});
        console.info(`\n>> after inspecting items at level ${level} filling capacity ${capacity}, selected:\n`, selected, `\nbest:`, res);
        return res;
    } else {
        return null;
    }
};


describe("Permutations", () => {
    it("verify", () => {
        expect(permutations01(1)).to.eql([ '0', '1' ]);
        expect(permutations01(2)).to.eql([ '00', '10', '01', '11' ]);
        expect(permutations01(3)).to.eql([ '000', '100', '010', '110', '001', '101', '011', '111' ]);
    });
});

describe("Knapsack 0/1", () => {
    it("Straightforward", () => {
        expect(straightforward(sets.p01)).to.eq(sets.p01.optimal.join(''));
        expect(straightforward(sets.p02)).to.eq(sets.p02.optimal.join(''));
        // expect(straightforward(sets.p08)).to.eq(sets.p08.optimal.join(''));
    });

    it("Recursive", () => {
        const items = sets.p02.weights.map((w,i) => ({ weight: w, profit: sets.p02.profits[i]}));
        console.info(items);
        console.info("----------------");
        console.info(`\n+++resultsfor capacity ${sets.p02.capacity}:`, recursive({ items, capacity: sets.p02.capacity }));
    });
});

