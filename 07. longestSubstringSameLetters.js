/*
⁡⁢⁢
*⁢LONGEST SUBSTRING WITH SAME LETTERS AFTER REPALCEMENT⁡

Problem Statement #

*Given a string with lowercase letters only, if you are allowed to replace no more than ‘k’ letters with any letter, find the length of the longest substring having the same letters after replacement.

#Example 1:

Input: String="aabccbb", k=2
Output: 5
Explanation: Replace the two 'c' with 'b' to have a longest repeating substring "bbbbb".

#Example 2:

Input: String="abbcb", k=1
Output: 4
Explanation: Replace the 'c' with 'b' to have a longest repeating substring "bbbb".

#Example 3:

Input: String="abccde", k=1
Output: 3
Explanation: Replace the 'b' or 'd' with 'c' to have the longest repeating substring "ccc".
⁡⁢⁢⁢
!S͟O͟L͟U͟T͟I͟O͟N


This problem follows the Sliding Window pattern and we can use a similar dynamic sliding window strategy as discussed in No-repeat Substring. We can use a HashMap to count the frequency of each letter.

We’ll iterate through the string to add one letter at a time in the window. We’ll also keep track of the count of the maximum repeating letter in any window (let’s call it maxRepeatLetterCount). So at any time, we know that we can have a window which has one letter repeating maxRepeatLetterCount times, this means we should try to replace the remaining letters. If we have more than ‘k’ remaining letters, we should shrink the window as we are not allowed to replace more than ‘k’ letters.


*/

function longestReapeatingSubstring(str, k) {
  let windowStart = 0,
    maxlength = 0,
    maxRepeatLetterCount = 0,
    frequecyMap = {};

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const righChar = str[windowEnd];
    if (!(righChar in frequecyMap)) {
      frequecyMap[righChar] = 0;
    }

    frequecyMap[righChar] += 1;

    maxRepeatLetterCount = Math.max(
      maxRepeatLetterCount,
      frequecyMap[righChar]
    );

    if (windowEnd - windowStart + 1 - maxRepeatLetterCount > k) {
      let leftChar = str[windowStart];
      frequecyMap[leftChar] -= 1;
      windowStart += 1;
    }
    maxlength = Math.max(maxlength, windowEnd + 1 - windowStart);
  }
  return maxlength;
}

console.log(longestReapeatingSubstring("aabccbb", 2));
console.log(longestReapeatingSubstring("abbcb", 1));
console.log(longestReapeatingSubstring("abccde", 1));
