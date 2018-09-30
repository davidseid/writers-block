import React from 'react';
import Source from './Source';
import Write from './Write';
import Suggestions from './Suggestions';
import setSourceText from '../actions/setSourceText';

const title = 'Writer\'s Block';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      source: {},
      currentWord: '',
      suggestedWords: []
    }
  }

  setSourceText(text) {

    const source = setSourceText(text);

    this.setState({
      source: source
    });
  }

  getCurrentWord(text) {
    const words = text.split(' ');

    let currentWord = words[words.length - 1].toLowerCase() || '';
    if (currentWord === '') {
      currentWord = words[words.length - 2].toLowerCase() || '';
    }

    this.suggestWords(currentWord);
    
    this.setState({
      currentWord: currentWord
    });
  }

  suggestWords(currentWord) {
    let words = [];

    if (this.state.source[currentWord]) {
      for (var key in this.state.source[currentWord].nextWords) {
        words.push(key);
      }
    }

    if (words.length === 0) {
      words.push(this.state.source.mostFrequentWord);
      let allWords = Object.keys(this.state.source);
      for (let i = 0; i < 9; i++) {
        words.push(allWords[Math.floor(Math.random() * allWords.length - 1)]);
      }
    }

    if (words.length > 10) {
      let randomizedWords = [];
      for (let i = 0; i < 10; i++) {
        randomizedWords.push(words[Math.floor(Math.random() * words.length - 1)]);
      }
      words = randomizedWords;
    }

    this.setState({
      suggestedWords: words
    })
  }

  render() {
    return (
      <div>
        <h2>{title}</h2>
        <Source setSourceText={this.setSourceText.bind(this)} />
        <Write getCurrentWord={this.getCurrentWord.bind(this)} />
        <Suggestions suggestedWords={this.state.suggestedWords} />
      </div>
    )
  }
} 

export default App;

