const fs = require("fs");
const dictFile = "/usr/share/dict/words";

const correct = ['', '', 'r', 'k', 'y'];
const wrongPlace = ['', '', '', '', ''];
const excluded = ['t', 'w', 'o', 'c', 'a', 'g', 'm', 'u'];

const dict = fs.readFileSync(dictFile, "utf8");

const words = dict.split(/\n/);

const length5 = words.filter(word => word.length === 5).map(word => word.toLowerCase());

console.info(">> 5-letter words in dictionary:", length5.length);
// const excludeExcluded = length5.filter(word => excluded.every(letter => ! word.match(letter)));

// const includeCorrect = excludeExcluded.filter(word => correct.every((letter, i) => letter ? word[i] === letter : true));


const includeCorrect = dict
    .split(/\n/)
    .filter(word => word.length === 5).map(word => word.toLowerCase())
    .filter(word => excluded.every(letter => ! word.match(letter)))
    .filter(word => correct.every((letter, i) => letter ? word[i] === letter : true));

const ss = includeCorrect.slice(1,100);
console.info(">>>", ss);