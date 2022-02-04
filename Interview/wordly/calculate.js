const { list } = require("./wordlist.json");

const matchesFilters = (wordList, filters) => {
  return wordList.filter((word) => {
    let match = true;
    for (let i = 0; i < filters.length; i += 1) {
      const { colour, position, letter } = filters[i];
      if (colour === "black") {
        if (word.includes(letter)) {
          match = false;
          break;
        }
      }
      if (colour === "green") {
        if (word[position] !== letter) {
          match = false;
          break;
        }
      }
      if (colour === "yellow") {
        if (!word.includes(letter) || word[position] === letter) {
          match = false;
          break;
        }
      }
    }
    return match;
  });
};

const colours = ["green", "yellow", "black"];

const calculateLetterColor = (wordList, letter, position, colour) => {
  const matchingWords = matchesFilters(wordList, [
    { colour, position, letter },
  ]);
  return {
    p: (matchingWords.length * 1.0) / wordList.length,
    list: matchingWords,
  };
};

const createObject = (word, obj, depth) => {
  // Recursively create decision tree structure
  if (depth > 4) {
    return obj;
  } else {
    // For each colour, add probabilities and new lists
    colours.forEach((colour) => {
      if (!obj[colour] && obj.list.length > 0) {
        obj[colour] = calculateLetterColor(
          obj.list,
          word[depth],
          depth,
          colour
        );
      }
    });
    const newDepth = depth + 1;
    colours.forEach((colour) => {
      if (obj.list.length > 0) {
        createObject(word, obj[colour], newDepth);
      }
    });
  }
};

const fillInObject = (word, originalList) => {
  let depth = 0;
  let composedObj = { list: originalList, p: 1 };
  createObject(word, composedObj, depth);
  return composedObj;
};

const calculateP = (arr, obj, p, depth) => {
  colours.forEach((colour) => {
    if (obj[colour] && obj[colour].list.length > 0) {
      // console.log({ p: obj.p * p, depth });
      if (depth === 4) {
        arr.push(obj[colour].p * p);
      } else {
        calculateP(arr, obj[colour], obj[colour].p * p, depth + 1);
      }
    }
  });
};

const calculateWordScore = (obj, word) => {
  // Go through each branch in tree to multiply probabilities
  // Square each probability and add to array
  // Return the sum of the array
  const pValues = [];
  const depth = 0;
  calculateP(pValues, obj, 1, depth);
  const pSquared = pValues.map((value) => value * value);
  const score = pSquared.reduce((pv, cv) => pv + cv, 0);
  return score;
};

const fullList = list;

const calculate = (filters, mode) => {
  const filteredList = matchesFilters(fullList, [...filters]);

  let usedList = mode === "hard" ? filteredList : fullList;

  let minScore = 1;
  let minWord = usedList[0];

  if (filteredList.length === 1) {
    return { minScore, word: filteredList[0], list: filteredList };
  } else if (filteredList.length < 4) {
    // Start guessing potential words to see if you get lucky
    usedList = filteredList;
    for (let i = 1; i < usedList.length; i += 1) {
      const oneWordObj = fillInObject(usedList[i], filteredList);
      const score = calculateWordScore(oneWordObj, usedList[i]);
      if (score < minScore) {
        minScore = score;
        minWord = usedList[i];
      }
    }
    return { minScore, word: minWord, list: filteredList };
  } else {
    for (let i = 1; i < usedList.length; i += 1) {
      const oneWordObj = fillInObject(usedList[i], filteredList);
      const score = calculateWordScore(oneWordObj, usedList[i]);
      if (score < minScore) {
        minScore = score;
        minWord = usedList[i];
      }
    }
    return { minScore, word: minWord, list: filteredList };
  }
};

console.info(">> calculated:", calculate([]));

