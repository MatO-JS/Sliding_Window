/*

*Given an array of characters where each character represents a fruit tree, you are given two baskets and your goal is to put maximum number of fruits in each basket. The only restriction is that each basket can have only one type of fruit.

*You can start with any tree, but once you have started you can’t skip a tree. You will pick one fruit from each tree until you cannot, i.e., you will stop when you have to pick from a third fruit type.

*Write a function to return the maximum number of fruits in both the baskets.

#͟E͟x͟a͟m͟p͟l͟e 1͟:

⁡⁢⁣⁣Input: Fruit=['A', 'B', 'C', 'A', 'C']
Output: 3
Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray ['C', 'A', 'C']⁡

#E͟x͟a͟m͟p͟l͟e 2͟:

⁡⁢⁣⁣Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
Output: 5
Explanation: We can put 3 'B' in one basket and two 'C' in the other basket. 
This can be done if we start with the second letter: ['B', 'C', 'B', 'B', 'C']

*/

//⁡⁣⁣⁢​‌‌‍ ⁡⁣⁢⁣​‌‍‌S͟o͟l͟u͟t͟i͟o͟n​⁡

const fruitsIntoBaskets = (fruits) => {
  let windoStart = 0,
    maxLength = 0,
    fruitFrequency = {};

  for (let windowEnd = 0; windowEnd < fruits.length; windowEnd++) {
    const rightFruit = fruits[windowEnd];
    if (!(rightFruit in fruitFrequency)) {
      fruitFrequency[rightFruit] = 0;
    }
    fruitFrequency[rightFruit] += 1;
    while (Object.keys(fruitFrequency).length > 2) {
      const leftFruit = fruits[windoStart];
      fruitFrequency[leftFruit] -= 1;
      if (fruitFrequency[leftFruit] === 0) {
        delete fruitFrequency[leftFruit];
      }
      windoStart += 1;
    }
    maxLength = Math.max(maxLength, windowEnd - windoStart + 1);
  }
  return maxLength;
};

console.log(fruitsIntoBaskets(["A", "B", "C", "A", "C"]));
console.log(fruitsIntoBaskets(["A", "B", "C", "B", "B", "C"]));
