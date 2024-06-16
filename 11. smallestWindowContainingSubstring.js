/*
*Smallest Window containing Substring (hard) #

*Given a string and a pattern, find the smallest substring in the given string which has all the characters of the given pattern.

Example 1:

Input: String="aabdec", Pattern="abc"
Output: "abdec"
Explanation: The smallest substring having all characters of the pattern is "abdec"

Example 2:

Input: String="abdabca", Pattern="abc"
Output: "abc"
Explanation: The smallest substring having all characters of the pattern is "abc".

Example 3:

Input: String="adcad", Pattern="abc"
Output: ""
Explanation: No substring in the given string has all characters of the pattern.

⁡⁢⁣⁣Solution ⁡

This problem follows the Sliding Window pattern and has a lot of similarities with Permutation in a String with one difference. In this problem, we need to find a substring having all characters of the pattern which means that the required substring can have some additional characters and doesn’t need to be a permutation of the pattern. Here is how we will manage these differences:

    We will keep a running count of every matching instance of a character.
    Whenever we have matched all the characters, we will try to shrink the window from the beginning, keeping track of the smallest substring that has all the matching characters.
    We will stop the shrinking process as soon as we remove a matched character from the sliding window. One thing to note here is that we could have redundant matching characters, e.g., we might have two ‘a’ in the sliding window when we only need one ‘a’. In that case, when we encounter the first ‘a’, we will simply shrink the window without decrementing the matched count. We will decrement the matched count when the second ‘a’ goes out of the window.

*/

function find_smallest_subString(str, pattern) {
  let windowStart = 0,
    matched = 0,
    subStrStart = 0,
    minLength = str.length + 1,
    charFrequency = {};

  for (i = 0; i < pattern.length; i++) {
    const chr = pattern[i];
    if (!(chr in charFrequency)) {
      charFrequency[chr] = 0;
    }
    charFrequency[chr] += 1;
  }

  // try to extend the range [windowStart, windowEnd]
  for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (rightChar in charFrequency) {
      charFrequency[rightChar] -= 1;

      // count every matching of a character
      if (charFrequency[rightChar] >= 0) {
        matched += 1;
      }
    }

    // Shrink the window if we can finsh as soon as we remove a  matched character

    while (matched === pattern.length) {
      if (minLength > windowEnd - windowStart + 1) {
        minLength = windowEnd - windowStart + 1;
        subStrStart = windowStart;
      }

      const leftchar = str[windowStart];
      windowStart += 1;
      if (leftchar in charFrequency) {
        //Note that we could have redundant matchin characters, therefow we 'll decrement the matched count only when a useful occurrence of a matched character is going out of the window
        if (charFrequency[leftchar] === 0) {
          matched -= 1;
        }
        charFrequency[leftchar] += 1;
      }
    }
  }

  if (minLength > str.length) {
    return "";
  }
  return str.substring(subStrStart, subStrStart + minLength);
}

console.log(find_smallest_subString("aabdec", "abc"));
console.log(find_smallest_subString("abdabca", "abc"));
console.log(find_smallest_subString("adcad", "abc"));

/*
from GPt
*Steps and Logic

    ⁡⁢⁣⁣Initialize Variables:
        windowStart: The starting index of the sliding window.
        minLength: The length of the smallest window found (initialized to a large value).
        subStrStart: The starting index of the smallest window found.
        matched: The number of characters that match the frequency required by the pattern.
        charFrequency: A hashmap to store the frequency of each character in the pattern.

    Build Frequency Map:
        Create a frequency map (charFrequency) for the characters in the pattern.

    Sliding Window:
        Use a sliding window that expands with windowEnd iterating over the string.
        For each rightChar (character at windowEnd), if it exists in charFrequency, decrement its frequency in the hashmap.
        If the frequency of rightChar becomes zero, it means one character requirement is completely matched, so increment matched.

    Check for Valid Window:
        When matched equals the number of unique characters in the pattern, a valid window is found.
        Check if the length of this window is smaller than minLength. If so, update minLength and subStrStart.

    Shrink the Window:
        Attempt to shrink the window from the left by moving windowStart right and adjusting the frequencies and matched count accordingly.
        If the character at windowStart exists in charFrequency, increment its frequency back in the hashmap.
        If its frequency becomes greater than zero, it means we need this character again, so decrement matched.
⁡
    Result:
        If minLength is still infinity, it means no valid window was found. Otherwise, return the smallest window substring. 
        
       ​‌‌‍⁡⁢⁣⁢𝘐𝘵𝘦𝘳𝘢𝘵𝘪𝘰𝘯𝘴⁡​ 


 ⁡⁣⁣⁢Iteration 1 (windowEnd = 0):

    rightChar = 'a'
    charFrequency = { a: 0, b: 1, c: 1 }
    matched = 1
    Sliding window: "a"

Iteration 2 (windowEnd = 1):

    rightChar = 'a'
    charFrequency = { a: -1, b: 1, c: 1 }
    matched = 1
    Sliding window: "aa"

Iteration 3 (windowEnd = 2):

    rightChar = 'b'
    charFrequency = { a: -1, b: 0, c: 1 }
    matched = 2
    Sliding window: "aab"

Iteration 4 (windowEnd = 3):

    rightChar = 'd'
    charFrequency = { a: -1, b: 0, c: 1 }
    matched = 2
    Sliding window: "aabd"

Iteration 5 (windowEnd = 4):

    rightChar = 'e'
    charFrequency = { a: -1, b: 0, c: 1 }
    matched = 2
    Sliding window: "aabde"

Iteration 6 (windowEnd = 5):

    rightChar = 'c'
    charFrequency = { a: -1, b: 0, c: 0 }
    matched = 3
    minLength is updated to 6
    subStrStart is updated to 0
    Sliding window: "aabdec"

Iteration 7:

    Shrinking starts as matched === pattern.length
    leftChar = 'a'
    charFrequency = { a: 0, b: 0, c: 0 }
    windowStart is incremented to 1
    minLength is updated to 5
    subStrStart is updated to 1
    Sliding window: "abdec"

Iteration 8:

    Continue shrinking as matched === pattern.length
    leftChar = 'a'
    charFrequency = { a: 1, b: 0, c: 0 }
    matched is decremented to 2
    windowStart is incremented to 2
    Sliding window: "bdec"

End:

    The loop ends, and the smallest window containing all characters of the pattern is "abdec".⁡
        
        */
