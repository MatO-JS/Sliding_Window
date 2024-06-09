// Problem: Given an array of integers `arr` and a positive integer `k`, find the average of all subarrays of size `k` within `arr`.
//
// Solution Logic:
// We will use the sliding window technique to efficiently calculate the averages of all subarrays of size `k`.
// The idea is to maintain a window of size `k` and slide it over the array, calculating the average for each window position.
// We initialize `windowSum` to store the sum of elements in the current window, `windowStart` to keep track of the start index of the window,
// and `result` to store the averages of all windows.
// We iterate through the array using `windowEnd` as the index, and for each iteration:
// 1. Add the element at `windowEnd` to `windowSum`.
// 2. If the window size is equal to `k`, calculate the average and store it in `result`.
// 3. Subtract the value at `windowStart` from `windowSum` to remove the leftmost element from the window.
// 4. Increment `windowStart` to slide the window forward.
// Finally, we return the `result` array containing the averages of all subarrays of size `k`.

function findAverage(arr, k) {
  // Initialize the windowSum, windowStart, and the result array to store the averages
  let windowSum = 0;
  let windowStart = 0;
  let result = [];

  // Loop through the entire array and find the windowSum
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    // Add the element at the current windowEnd index to the windowSum
    windowSum += arr[windowEnd];

    // Check if the window size is equal to k
    if (windowEnd >= k - 1) {
      // Calculate the average of the current window and insert it into the result array
      result.push(windowSum / k);

      // Subtract the leftmost element from the windowSum to slide the window forward
      windowSum -= arr[windowStart];

      // Increment windowStart to slide the window forward
      windowStart += 1;
    }
  }

  // Return the result array containing the averages of all subarrays of size k
  return result;
}

const arr = [1, 3, 2, 6, -1, 4, 1, 8, 2];
const k = 5;
const result = findAverage(arr, k);
console.log(result); // Output: [2.2, 2.8, 2.4, 3.6, 2.8]
