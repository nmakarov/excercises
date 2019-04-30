var expect = require('chai').expect;

describe("Find if an integer can be expressed as a sum of any two elements of the sorted array", () => {
    const arr = [ 1, 3, 6, 7, 12, 18 ];

    it("Take One", () => {
        const findSolution = (arr, r) => {
            let start = 0;
            let end = arr.length-1;
            while (start < end) {
                const sum = arr[start] + arr[end];
                if (sum > r) {
                    end--;
                } else if (sum < r) {
                    start++;
                } else {
                    console.info(`>> found solution: ${arr[start]} + ${arr[end]}`)
                    return true;
                }
            }
            return false;
        };

        expect(findSolution(arr, 15)).to.eq(true);
        expect(findSolution(arr, 16)).to.eq(false);
    });
    
    
});

/*
Try the Set solution:

const findSum = (arr, val) => {
  let searchValues = new Set();
  searchValues.add(val - arr[0]);
  for (let i = 1, length = arr.length; i < length; i++) {
    let searchVal = val - arr[i];
    if (searchValues.has(arr[i])) {
      return true;
    } else {
      searchValues.add(searchVal);
    }
  };
  return false;
};
This solution can be refactored to fit on just a couple of lines:

const findSum = (arr, sum) =>
  arr.some((set => n => set.has(n) || !set.add(sum - n))(new Set));

  
*/
