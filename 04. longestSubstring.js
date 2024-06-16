/*

⁡⁣⁣⁢L͟o͟n͟g͟e͟s͟t S͟u͟b͟s͟t͟r͟i͟n͟g w͟i͟t͟h ͟K d͟i͟s͟t͟i͟n͟c͟t C͟h͟a͟r͟a͟c͟t͟e͟r͟s (͟m͟e͟d͟i͟u͟m͟)⁡

* Given a string , find the length of the longest substring in it with no more than k distinct characters

# string "araaci", k = 2
# output : 4 , araa

# string "araaci", k=1
# output : 2 , "aa"

# string "cbbebi" k=3
# output 5 "cbbeb" and "bbebi"

*/

function longestSubstring(str, k) {
  // Initialize windowStart pointer to the beginning of the string
  let windowStart = 0;
  // Initialize maxLength to keep track of the maximum length of a valid substring
  maxLength = 0;
  // Initialize an object to store the character frequencies within the current window
  let charFrequency = {};

  // Iterate through the string using the windowEnd pointer
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    // Get the character at the current windowEnd position
    const rightChar = str[windowEnd];

    // If the character is not in the charFrequency object, initialize its frequency to 0
    if (!(rightChar in charFrequency)) {
      charFrequency[rightChar] = 0;
    }

    // Increment the frequency of the current character
    charFrequency[rightChar] += 1;

    // While the number of distinct characters in the current window is greater than k
    while (Object.keys(charFrequency).length > k) {
      // Get the character at the windowStart position
      const leftChar = str[windowStart];
      // Decrement the frequency of the leftChar in the charFrequency object
      charFrequency[leftChar] -= 1;

      // If the frequency of the leftChar becomes 0
      if (charFrequency[leftChar] === 0) {
        // Remove the leftChar from the charFrequency object
        delete charFrequency[leftChar];
      }

      // Move the windowStart pointer one step ahead
      windowStart += 1;
    }

    // Update maxLength to be the maximum of its current value and the length of the current window
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  // Return the maximum length of a valid substring
  return maxLength;
}

// console.log(charFrequency);
console.log(longestSubstring("abcbcefg", 3));
/*


1. The `longestSubstring` function takes two arguments: `str` (the input string) and `k` (the maximum number of distinct characters allowed).
2. The function initializes three variables:
  - `windowStart`: This variable represents the start of the sliding window.
  - `maxLength`: This variable will store the length of the longest substring with at most `k` distinct characters.
  - `charFrequency`: This is an object (dictionary) that will store the frequencies of the characters in the current window.
3. The function then enters a `for` loop that iterates over the string using the `windowEnd` variable, which represents the end of the sliding window.
4. Inside the loop, the code does the following:
  - It gets the character at the current `windowEnd` position and stores it in the `rightChar` variable.
  - It checks if the `rightChar` is already present in the `charFrequency` object. If not, it initializes its value to 0.
  - It increments the frequency of the `rightChar` in the `charFrequency` object.
5. After incrementing the frequency, the code enters a `while` loop that continues as long as the number of distinct characters in the current window (represented by the length of the keys in the `charFrequency` object) is greater than `k`.
6. Inside the `while` loop, the code does the following:
  - It gets the character at the `windowStart` position and stores it in the `leftChar` variable.
  - It decrements the frequency of the `leftChar` in the `charFrequency` object.
  - If the frequency of the `leftChar` becomes 0, it removes the `leftChar` from the `charFrequency` object using the `delete` operator.
  - It increments the `windowStart` variable, effectively shrinking the sliding window from the left side.
7. After the `while` loop completes (or if it never entered the loop), the code updates the `maxLength` variable to be the maximum of its current value and the length of the current window (`windowEnd - windowStart + 1`).
8. Once the outer `for` loop has iterated over the entire string, the function returns the `maxLength` variable, which represents the length of the longest substring with at most `k` distinct characters.

This code uses the sliding window technique to find the longest substring with at most `k` distinct characters. It maintains a window of characters and uses the `charFrequency` object to keep track of the distinct characters and their frequencies within the current window. When the number of distinct characters exceeds `k`, it shrinks the window from the left side until the condition is satisfied.

The time complexity of this solution is O(n), where n is the length of the input string `str`. This is because the code iterates over the string once using the `windowEnd` variable, and the operations inside the loops take constant time on average. The space complexity is O(min(m, k)), where m is the number of distinct characters in the string, as the `charFrequency` object can store at most `k` distinct characters (or all distinct characters if there are fewer than `k`). */
