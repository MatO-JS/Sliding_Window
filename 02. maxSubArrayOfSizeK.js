//* Find the sub array of the given array which has the maximum sum. The size of the sub array is given

const maxSumSubArraySizeK = (arr, k) => {
  let windowSum = 0;
  let windowStart = 0;
  let maxSum = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];

    if (windowEnd >= k - 1) {
      maxSum = Math.max(windowSum, maxSum);

      windowSum -= arr[windowStart];

      windowStart += 1;
    }
  }

  return maxSum;
};

console.log(maxSumSubArraySizeK([5, 2, 5, 4, 3, 2, 3, 5], 4));
