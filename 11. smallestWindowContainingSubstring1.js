/*

*Steps to Implement Sliding Window Technique:

⁡⁢⁣⁣    Initialize Variables:
        Required: A hashmap  to store the frequency of characters in the pattern.

    Expand and Contract the Window:
        Expand: Increase the window size by moving the right pointer to include more characters until you have a valid window (contains all characters from the pattern).
        Contract: Once you have a valid window, try to shrink it from the left (left pointer) to find the smallest possible window that still satisfies the condition.

    Track Minimum Length:
        Throughout the process, track the minimum length of the substring that satisfies the condition.

    Update Results:
        Update your result whenever you find a smaller valid window during the contraction step.⁡

Example Walkthrough:

Let's say you have a string "ADOBECODEBANC" and a pattern "ABC".

    Initialize a hashmap (patternMap) to count occurrences of each character in the pattern "ABC": {A: 1, B: 1, C: 1}.

    Use two pointers (left and right) to represent the current window in the string.

    Step-by-Step Execution:
        Expand the window by moving the right pointer to include characters until the window contains all characters from the pattern.
        Once a valid window is found, try to contract it from the left to find the minimum window.
 

⁡⁣⁢⁣   Steps to Solve the Problem using chatGpt prompt 'Explain in layman terms the logic of the above problem(paste the code)`

⁡
   ⁡⁢⁣⁣ Setup
        We need to keep track of the characters we are looking for (from pattern) and how many times each character appears in pattern.
        We also need to keep track of the smallest valid substring we find.

    Count Characters in the Pattern
        We go through each character in pattern and count how many times each character appears. This helps us know what we need to find in str.

    Slide the Window
        Imagine you have a window that can slide from the start to the end of str. This window will help us look at parts of the string.
        We start with the window at the beginning of str.

    Expand the Window
        We move the end of the window to the right, one character at a time. This means we include more characters in our window.
        Every time we include a character that we need (one that is in pattern), we note that we have one more of that character.

    Check if Window is Valid
        A window is valid if it contains all characters from pattern in the right quantities.
        If our window is valid (i.e., it contains all the characters of pattern), we then try to make it smaller from the left to see if we can still keep it valid.

    Shrink the Window
        We move the start of the window to the right, one character at a time, to try and make the window smaller while still containing all characters of pattern.
        If removing a character from the left makes the window invalid, we stop shrinking and start expanding again.

    Update the Smallest Window
        Every time we find a valid window, we check if it’s the smallest one we’ve found so far. If it is, we remember its position and size.

    Return the Result
        Once we’ve checked all possible windows, we return the smallest valid window we found. If no such window exists, we return an empty string.⁡
 */

function find_smallest_subString(str, pattern) {
  // Define a function that takes two arguments: str (input string) and pattern (pattern string)
  //*Initialize variables
  let windowStart = 0, // start of the sliding window, initially set to 0
    matched = 0, // count of characters from the pattern that are matched in the current window, initially set to 0
    subStrStart = 0, // start index of the smallest substring found so far, initially set to 0
    minLength = str.length + 1, // initialize minLength to a large value (greater than the length of the input string)
    charFrequency = {}; // object to store the frequency of characters in the pattern, initially an empty object

  //* Create a frequency map for the pattern characters
  for (let i = 0; i < pattern.length; i++) {
    // Iterate over each character in the pattern string
    const chr = pattern[i]; // Get the current character
    if (!(chr in charFrequency)) {
      // If the current character is not in the charFrequency object
      charFrequency[chr] = 0; // Add the character to the object with an initial frequency of 0
    }
    charFrequency[chr] += 1; // Increment the frequency of the current character in the charFrequency object
  }

  //* Try to extend the range [windowStart, windowEnd]
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    // Iterate over each character in the input string using the windowEnd variable
    const rightChar = str[windowEnd]; // Get the current character from the input string

    // If the current character is in the pattern, decrease its frequency
    if (rightChar in charFrequency) {
      // If the current character is present in the charFrequency object
      charFrequency[rightChar] -= 1; // Decrement the frequency of the current character in the charFrequency object

      // If the frequency becomes non-negative, it means we have matched a character
      if (charFrequency[rightChar] >= 0) {
        // If the frequency of the current character is non-negative
        matched += 1; // Increment the matched counter
      }
    }

    //* Shrink the window if we can finish as soon as we remove a matched character
    while (matched === pattern.length) {
      // While all characters from the pattern are matched
      // Update the smallest substring found so far
      if (minLength > windowEnd - windowStart + 1) {
        // If the current window length is smaller than the minLength
        minLength = windowEnd - windowStart + 1; // Update minLength to the current window length
        subStrStart = windowStart; // Update subStrStart to the current windowStart
      }

      const leftChar = str[windowStart]; // Get the character at the left side of the window
      windowStart += 1; // Move the windowStart one step ahead

      //* If the left character is in the pattern, update its frequency
      if (leftChar in charFrequency) {
        // If the left character is present in the charFrequency object
        // Note that we could have redundant matching characters, therefore we'll decrement the matched count only when a useful occurrence of a matched character is going out of the window
        if (charFrequency[leftChar] === 0) {
          // If the frequency of the left character is 0
          matched -= 1; // Decrement the matched counter
        }
        charFrequency[leftChar] += 1; // Increment the frequency of the left character in the charFrequency object
      }
    }
  }

  //* If no substring is found, return an empty string
  if (minLength > str.length) {
    // If minLength is greater than the length of the input string
    return ""; // Return an empty string
  }

  //* Return the smallest substring
  return str.substring(subStrStart, subStrStart + minLength); // Return the smallest substring from the input string using the subStrStart and minLength values
}

console.log(find_smallest_subString("aabdec", "abc")); // Call the function with the input string "aabdec" and pattern string "abc", and log the result to the console
