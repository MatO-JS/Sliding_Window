const smallestSubstring = (str, pattern) => {
  let ws = 0,
    minLength = str.length + 1,
    charFrequency = {},
    subStrStart = 0,
    matched = 0;

  // creating the hashmap to calculate the frequencies of the characters in the pattern

  for (let i = 0; i < pattern.length; i++) {
    let chr = pattern[i];
    if (!(chr in charFrequency)) {
      charFrequency[chr] = 0;
    }
    charFrequency[chr] += 1;
  }

  // Iterate through the string adding one character at a time in to the sliding window. If the character being added matches a character in the hashmap decrease the frequecy fo the character by one.If the frequency of the character becomes 0 or +ve we have a matched character.

  for (let we = 0; we < str.length; we++) {
    let rightChar = str[we];
    if (rightChar in charFrequency) {
      charFrequency[rightChar] -= 1;
      if (charFrequency[rightChar] >= 0) {
        matched += 1;
      }
      
    }

    // When number of matched characters becomes equal to the length of the pattern we have our pattern in the current window(along with other characters) .We will now update the minLength with the current window length and also update the start index of the current window. Under this matched condition we try to shrink the window and still see whether the pattern is still in the shrinked window. If not we will expand the window . While expanding if we loose the pattern we will come out of the while loop and go back to the iteration process.

    while (matched === pattern.length) {
      // Update the minLength and startindex of the current window which contains the matched characters

      if (minLength > we + 1 - ws) {
        minLength = we + 1 - ws;
        subStrStart = ws;
      }

      // Shrinking the window

      let leftChar = str[ws];

      ws += 1;
      if (leftChar in charFrequency) {
        if (charFrequency[leftChar] === 0) {
          matched -= 1;
        }
        charFrequency[leftChar] += 1;
      }
    }
  }

  if (minLength > str.length) {
    return "";
  }
  return str.substring(subStrStart, subStrStart + minLength);
};


/*

*Role of subStrStart

In the `find_smallest_subString` function, `subStrStart` is used to record the starting index of the smallest valid window (substring) found during the process. This allows us to later extract and return the smallest substring that contains all characters of the given pattern.

### Detailed Explanation of `subStrStart` Usage

1. **Tracking the Start of the Smallest Valid Window:**
   - When we find a valid window (i.e., a substring of `str` that contains all characters of `pattern`), we compare its length with the smallest length found so far (`minLength`).
   - If the current window is smaller, we update `minLength` to the current window's length and record the starting index of this window in `subStrStart`.

2. **Why It's Necessary:**
   - Without `subStrStart`, we would not know where the smallest valid window begins. We would only know its length, which is not enough to extract the actual substring from `str`.
   - By recording the starting index, we can use it to easily extract the substring from `str` once the loop completes.

### Example to Illustrate the Importance of `subStrStart`

Consider `str = "ADOBECODEBANC"` and `pattern = "ABC"`:

- **Initial Setup:**
  - `minLength = str.length + 1` (which is 13 + 1 = 14)
  - `subStrStart = 0`

- **Finding the First Valid Window:**
  - As we slide the window from left to right, we eventually find a valid window from index 0 to index 5 (`"ADOBEC"`).
  - We check if this window length (6) is smaller than `minLength` (14). It is, so we:
    - Update `minLength` to 6.
    - Set `subStrStart` to 0 (the starting index of this window).

- **Finding a Smaller Valid Window:**
  - Continuing to slide the window, we find another valid window from index 9 to index 12 (`"BANC"`).
  - This window length (4) is smaller than the current `minLength` (6). So we:
    - Update `minLength` to 4.
    - Set `subStrStart` to 9 (the starting index of this smaller window).

- **End of Loop:**
  - After checking all possible windows, the smallest valid window has `minLength` of 4 and starts at index 9.
  - We use `subStrStart` and `minLength` to extract and return the substring `"BANC"` from `str`.

### Code Snippet Highlighting `subStrStart`

Here's the part of the code where `subStrStart` is used:


 *Initialize variables
let windowStart = 0,
    matched = 0,
    subStrStart = 0, // This is used to track the start of the smallest window
    minLength = str.length + 1,
    charFrequency = {};

 *Populate charFrequency map
for (i = 0; i < pattern.length; i++) {
    const chr = pattern[i];
    if (!(chr in charFrequency)) {
        charFrequency[chr] = 0;
    }
    charFrequency[chr] += 1;
}

 *Try to extend the range [windowStart, windowEnd]
for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (rightChar in charFrequency) {
        charFrequency[rightChar] -= 1;
        if (charFrequency[rightChar] >= 0) {
            matched += 1;
        }
    }

     *Shrink the window as much as possible while maintaining a valid window
    while (matched === pattern.length) {
        if (minLength > windowEnd - windowStart + 1) {
            minLength = windowEnd - windowStart + 1;
            subStrStart = windowStart; // Update subStrStart to the current window's start
        }

        const leftChar = str[windowStart];
        windowStart += 1;
        if (leftChar in charFrequency) {
            if (charFrequency[leftChar] === 0) {
                matched -= 1;
            }
            charFrequency[leftChar] += 1;
        }
    }
}

 *Return the smallest substring or an empty string if no valid window is found
if (minLength > str.length) {
    return "";
}

 *Use subStrStart to extract the substring

return str.substring(subStrStart, subStrStart + minLength); 


### Conclusion
`subStrStart` is crucial for:

- **Recording the Position:** It records the starting position of the smallest valid window found.
- **Extracting the Substring:** After identifying the smallest window, it allows us to easily extract the substring from `str`.

This helps in returning the correct smallest substring that contains all characters from `pattern`.

*/