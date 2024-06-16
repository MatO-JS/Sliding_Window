//*Longest Subarray with Ones after Replacement (hard)
/*
Problem Statement #

Given an array containing 0s and 1s, if you are allowed to replace no more than ‘k’ 0s with 1s, find the length of the longest contiguous subarray having all 1s.

Example 1:

Input: Array=[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2
Output: 6
Explanation: Replace the '0' at index 5 and 8 to have the longest contiguous subarray of 1s having length 6.

Example 2:

Input: Array=[0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], k=3
Output: 9
Explanation: Replace the '0' at index 6, 9, and 10 to have the longest contiguous subarray of 1s having length 9.

//*Solution 

This problem follows the Sliding Window pattern and is quite similar to Longest Substring with same Letters after Replacement. The only difference is that, in the problem, we only have two characters (1s and 0s) in the input arrays.

Following a similar approach, we’ll iterate through the array to add one number at a time in the window. We’ll also keep track of the maximum number of repeating 1s in the current window (let’s call it maxOnesCount). So at any time, we know that we can have a window which has 1s repeating maxOnesCount time, so we should try to replace the remaining 0s. If we have more than ‘k’ remaining 0s, we should shrink the window as we are not allowed to replace more than ‘k’ 0s.

*/

const longestSubarrayWithOnesAfterReplacement = (arr, k) => {
  let windowStart = 0,
    maxLength = 0,
    maxOnesCount = 0;

  // Try to extend the range [windowStart,windowEnd],

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    if (arr[windowEnd] === 1) {
      maxOnesCount += 1;
    }

    /* Current window size is from windowStart to windowEnd, overall we have a mximum of ones repeating 'maxOnesCount' times, this means we can have a window with 'maxOnesCount' 1's and the remaining are zeros which should replace with ones.Now if the remaining ones are more than k it is the time to shrink the window as we are not allowed to replace more than k zeros */

    if (windowEnd - windowStart + 1 - maxOnesCount > k) {
      if (arr[windowStart] === 1) {
        maxOnesCount -= 1;
      }
      windowStart += 1;
    }

    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
};

console.log(
  longestSubarrayWithOnesAfterReplacement([0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], 2)
);

console.log(
  longestSubarrayWithOnesAfterReplacement(
    [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1],
    3
  )
);


/*


The provided code implements a sliding window algorithm to find the length of the longest contiguous subarray containing at most `k` zeros after potentially replacing up to `k` zeros with ones. Here's a detailed explanation of how it works, along with a table for each iteration to show the values of all variables.

### Code Explanation

1. **Initialization**:
   - `windowStart` is initialized to 0, representing the starting index of the sliding window.
   - `maxLength` is initialized to 0, representing the maximum length of the subarray found so far.
   - `maxOnesCount` is initialized to 0, representing the number of 1s in the current window.

2. **Iterating through the array**:
   - The outer `for` loop iterates through the array using `windowEnd` as the index.
   - If the current element `arr[windowEnd]` is 1, increment `maxOnesCount`.

3. **Checking window validity**:
   - If the window size (`windowEnd - windowStart + 1`) minus `maxOnesCount` exceeds `k` (i.e., the number of zeros in the current window exceeds `k`), shrink the window from the left by incrementing `windowStart`.
   - If the element at `windowStart` is 1, decrement `maxOnesCount` because a 1 is being removed from the window.

4. **Updating the maximum length**:
   - Update `maxLength` with the maximum value between the current `maxLength` and the size of the current window (`windowEnd - windowStart + 1`).

5. **Return the result**:
   - Return the `maxLength`, which is the length of the longest subarray that satisfies the condition.

### Variable Table for Each Iteration

To better understand how the variables change during each iteration, let's construct a table for the given input array `[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1]` and `k = 2`.

| Iteration | `windowEnd` | `arr[windowEnd]` | `windowStart` | `maxOnesCount` | `maxLength` | Condition (`windowEnd - windowStart + 1 - maxOnesCount > k`) | Action |
|-----------|--------------|------------------|---------------|----------------|-------------|------------------------------------------------------------|--------|
| 1         | 0            | 0                | 0             | 0              | 1           | No                                                         | Update `maxLength` |
| 2         | 1            | 1                | 0             | 1              | 2           | No                                                         | Update `maxLength` |
| 3         | 2            | 1                | 0             | 2              | 3           | No                                                         | Update `maxLength` |
| 4         | 3            | 0                | 0             | 2              | 4           | No                                                         | Update `maxLength` |
| 5         | 4            | 0                | 0             | 2              | 4           | Yes                                                        | Increment `windowStart` to 1 |
| 6         | 5            | 0                | 1             | 2              | 4           | Yes                                                        | Increment `windowStart` to 2 |
| 7         | 6            | 1                | 2             | 3              | 5           | No                                                         | Update `maxLength` |
| 8         | 7            | 1                | 2             | 4              | 6           | No                                                         | Update `maxLength` |
| 9         | 8            | 0                | 2             | 4              | 6           | Yes                                                        | Increment `windowStart` to 3, decrement `maxOnesCount` to 3 |
| 10        | 9            | 1                | 3             | 4              | 7           | No                                                         | Update `maxLength` |
| 11        | 10           | 1                | 3             | 5              | 8           | No                                                         | Update `maxLength` |

### Explanation of Actions

- In each iteration, the algorithm updates the variables and checks the condition to decide whether to shrink the window or update the `maxLength`.
- When the condition `windowEnd - windowStart + 1 - maxOnesCount > k` is true, the algorithm shrinks the window from the left by incrementing `windowStart` until the condition is false.
- The algorithm continuously updates `maxLength` with the size of the valid window.

By the end of the iterations, the algorithm returns the length of the longest subarray with at most `k` zeros, which is 8 for the given input.
*/