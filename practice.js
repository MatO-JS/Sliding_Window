const wordConcatenation = (str, words) => {
  if (words.length === 0 || words[0].length === 0) {
    return [];
  }

  const resultIndices = [];
  const wordsCount = words.length;
  const wordLength = words[0].length;
  const wordFrequency = {};

  words.forEach((word) => {
    if (!(word in wordFrequency)) {
      wordFrequency[word] = 0;
    }
    wordFrequency[word] += 1;
  });

  for (let i = 0; i < str.length - wordsCount * wordLength + 1; i++) {
    const wordsSeen = {};
    for (let j = 0; j < wordsCount; j++) {
      const nextWordIndex = i + j * wordLength;
      const word = str.substring(nextWordIndex, nextWordIndex + wordLength);

      if (!(word in wordFrequency)) {
        break;
      }

      if (!(word in wordsSeen)) {
        wordsSeen[word] = 0;
      }

      wordsSeen[word] += 1;

      if (wordsSeen[word] > wordFrequency[word]) {
        break;
      }

      if (j + 1 === wordsCount) {
        resultIndices.push(i);
      }
    }
  }
  return resultIndices;
};

console.log(wordConcatenation("catfoxcat", ["cat", "fox"]));
