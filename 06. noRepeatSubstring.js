/*
*Given a string, find the length of the longest substring which has no repeating characters.

#Example 1:

⁡⁢⁣⁣Input: String="aabccbb"
Output: 3
Explanation: The longest substring without any repeating characters is "abc".⁡

#Example 2:

⁡⁢⁣⁣Input: String="abbbb"
Output: 2
Explanation: The longest substring without any repeating characters is "ab".⁡

#Example 3:

⁡⁢⁣⁣Input: String="abccde"
Output: 3
Explanation: Longest substrings without any repeating characters are "abc" & "cde".⁡

!Solution #

⁡⁣⁢This problem follows the Sliding Window pattern and we can use a similar dynamic sliding window strategy as discussed in Longest Substring with K Distinct Characters. We can use a HashMap to remember the last index of each character we have processed. Whenever we get a repeating character we will shrink our sliding window to ensure that we always have distinct characters in the sliding window.
*/

// ​‌‌‍⁡⁢⁢⁣⁡⁣⁣⁢S͟O͟L͟U͟T͟I͟O͟N​⁡

function longestNoRepeatSubstring(str) {
  let windowStart = 0,
    maxLength = 0,
    charIndexMap = {};

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    let rightChar = str[windowEnd];

    if (rightChar in charIndexMap) {
      windowStart = Math.max(windowStart, charIndexMap[rightChar] + 1);
    }
    charIndexMap[rightChar] = windowEnd;
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
}
console.log(longestNoRepeatSubstring("abcabcbb"));
/*


The `charIndexMap` is an object that serves as a hash table or dictionary, where the keys are characters from the input string, and the values are the indices at which those characters were last seen.

Initially, `charIndexMap` is an empty object `{}`. As the function iterates through the string using the `windowEnd` pointer, it updates the `charIndexMap` with the current index of each character encountered.

#Here's an example to illustrate how `charIndexMap` is updated:
*/
/*
⁡⁢⁢⁢const str = 'abcabcbb';
let charIndexMap = {};

Initial state: charIndexMap is empty {}

After processing 'a' at index 0:
charIndexMap = { 'a': 0 }

After processing 'b' at index 1:
charIndexMap = { 'a': 0, 'b': 1 }

After processing 'c' at index 2:
charIndexMap = { 'a': 0, 'b': 1, 'c': 2 }

After processing 'a' at index 3:
charIndexMap = { 'a': 3, 'b': 1, 'c': 2 }

After processing 'b' at index 4:
charIndexMap = { 'a': 3, 'b': 4, 'c': 2 }

After processing 'c' at index 5:
charIndexMap = { 'a': 3, 'b': 4, 'c': 5 }

After processing 'b' at index 6:
charIndexMap = { 'a': 3, 'b': 6, 'c': 5 }

After processing 'b' at index 7:
charIndexMap = { 'a': 3, 'b': 7, 'c': 5 }⁡
*/
/*
Now, when the function encounters a repeated character, it checks if that character exists in `charIndexMap`. If it does, it means the character has been seen before, and it updates the `windowStart` pointer to be one position after the last seen index of that character (`charIndexMap[rightChar] + 1`). This ensures that the new window starts after the repeated character, effectively excluding the repeated character from the current substring.

For example, when processing the second 'a' at index 3 in the string 'abcabcbb', the function sees that 'a' already exists in `charIndexMap` with the value 0. It then updates `windowStart` to `charIndexMap['a'] + 1`, which is `0 + 1 = 1`. This means that the new window starts from index 1, effectively excluding the first 'a' from the current substring.

By using `charIndexMap`, the function can efficiently keep track of the last seen indices of characters and adjust the window accordingly to find the longest substring without repeating characters.

 */

// ⁡⁢⁢⁢​‌‌‌DRY RUN​⁡

/*

⁡⁢⁣⁣Now, let's dry run this function step by step for str = "abcabcbb":
Initial Values:

    windowStart = 0
    maxLength = 0
    charIndexMap = {}

Iteration 1 (windowEnd = 0):

    rightChar = 'a'
    'a' is not in charIndexMap.
    charIndexMap = { 'a': 0 }
    maxLength = max(0, 0 - 0 + 1) = 1

Iteration 2 (windowEnd = 1):

    rightChar = 'b'
    'b' is not in charIndexMap.
    charIndexMap = { 'a': 0, 'b': 1 }
    maxLength = max(1, 1 - 0 + 1) = 2

Iteration 3 (windowEnd = 2):

    rightChar = 'c'
    'c' is not in charIndexMap.
    charIndexMap = { 'a': 0, 'b': 1, 'c': 2 }
    maxLength = max(2, 2 - 0 + 1) = 3

Iteration 4 (windowEnd = 3):

    rightChar = 'a'
    'a' is in charIndexMap at index 0.
    windowStart = max(0, 0 + 1) = 1
    charIndexMap = { 'a': 3, 'b': 1, 'c': 2 }
    maxLength = max(3, 3 - 1 + 1) = 3

Iteration 5 (windowEnd = 4):

    rightChar = 'b'
    'b' is in charIndexMap at index 1.
    windowStart = max(1, 1 + 1) = 2
    charIndexMap = { 'a': 3, 'b': 4, 'c': 2 }
    maxLength = max(3, 4 - 2 + 1) = 3

Iteration 6 (windowEnd = 5):

    rightChar = 'c'
    'c' is in charIndexMap at index 2.
    windowStart = max(2, 2 + 1) = 3
    charIndexMap = { 'a': 3, 'b': 4, 'c': 5 }
    maxLength = max(3, 5 - 3 + 1) = 3

Iteration 7 (windowEnd = 6):

    rightChar = 'b'
    'b' is in charIndexMap at index 4.
    windowStart = max(3, 4 + 1) = 5
    charIndexMap = { 'a': 3, 'b': 6, 'c': 5 }
    maxLength = max(3, 6 - 5 + 1) = 3

Iteration 8 (windowEnd = 7):

    rightChar = 'b'
    'b' is in charIndexMap at index 6.
    windowStart = max(5, 6 + 1) = 7
    charIndexMap = { 'a': 3, 'b': 7, 'c': 5 }
    maxLength = max(3, 7 - 7 + 1) = 3

Final Values:

    maxLength = 3
⁡

*/
