'use strict';

const setSourceText = (text) => {
  const source = {};
  const words = text.replace( /\n/g, " " ).split(' ');
  let mostFrequentWordCount = 0;
  
  words.forEach((word, index) => {
    word = word.toLowerCase();

    if (index < words.length - 1) {
      let nextWord = words[index + 1];
      if (nextWord) {
        nextWord = nextWord.toLowerCase();
      }
      if (word[word.length - 1] === '.' || 
          word[word.length - 1] === ';' ||
          word[word.length - 1] === ',') {
            word = word.slice(0, word.length - 1);
          }
      if (nextWord[word.length - 1] === '.' || 
          nextWord[word.length - 1] === ';' ||
          nextWord[word.length - 1] === ',') {
            nextWord = nextWord.slice(0, word.length - 1);
          }
      if (!source[word]) {
        let nextWords = {};
        nextWords[nextWord] = 1;
        source[word] = {count: 1, nextWords: nextWords};
        mostFrequentWordCount = 1;
      } else {
        source[word].count += 1;
        if (source[word].count > mostFrequentWordCount) {
          mostFrequentWordCount = source[word].count;
          source['mostFrequentWord'] = word;
        }
        if (source[word].nextWords[nextWord]) {
          source[word].nextWords[nextWord] += 1;
        } else {
          source[word].nextWords[nextWord] = 1;
        }
      }
    }
  });

  return source;
};

export default setSourceText;