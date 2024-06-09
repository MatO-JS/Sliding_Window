//* Largest wubstring with no repeating characters

const largestSubstringWithNoRepeatingCharacters = (str) => {
  let windowStart = 0,
    charIndexMap = {},
    maxLength = 0;

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    let rightChar = str[windowEnd];

    if (rightChar in charIndexMap) {
      windowStart = Math.max(windowStart, charIndexMap[rightChar] + 1);
    }

    charIndexMap[rightChar] = windowEnd;
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
};
