/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = new Map();;
    this.makeChains();
   //console.log(`make chains object ${this.words}`)
   console.log("make chains object",this.chains);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
  for (let word of this.words) {
     this.addValuestoKeyChain(word); 
    }
  }

 

  /** return random text from chains */

  makeText(numWords = 100) {
   
    let randomWorldFromArray =''; 
    const text =[];

    while ( text.length < numWords && randomWorldFromArray !== null) {
      
      //1. randomly select a word from the array
    const randomWord = this.getRandomElement();
   
    //2.Find all words that can come after that word.
    const  words = this.chains.get(randomWord);
    
    //3. Pick one of those words randomly
    console.log(words);
    const randomIndexFrormArray = Math.floor(Math.random() * words.length);
    randomWorldFromArray= words[randomIndexFrormArray];
    if (randomWorldFromArray !== null)
     {
      text.push(randomWorldFromArray);
      console.log("text Array: ", text);
     }
    }

    return text.join(' ');
     
  }

  getRandomElement() {
    const  randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  getIndexes(elementToFind){
    let indexes =[];
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i] === elementToFind) {
        indexes.push(i);
      }
    }
    return indexes
  }
  getNextIndex(inputArray)
  {
    let lengthOfWords =  this.words.length;
    let nextIndexArray = []
    for (const number of inputArray)
    {
      if(number == (lengthOfWords-1))
      {
        nextIndexArray.push(null);
      }
      else
      {
        nextIndexArray.push(number+1)
      }
    }
    return nextIndexArray;
  }
  getWordsFromIndexes(indexesArray)
  {
     let nextWordsArray =[];

    for (const iterator of indexesArray) {
      if (iterator===null){
        nextWordsArray.push(null);
      }
      else{
        nextWordsArray.push(this.words[iterator]);
      }
    }
     return nextWordsArray;

  }
  addValuestoKeyChain(word)
  {
   let indexes = this.getIndexes(word);
   let nextIndexes = this.getNextIndex (indexes);
   let wordsFromIndexes =this.getWordsFromIndexes(nextIndexes);
   
   if (!this.chains.has(word)){
    this.chains.set(word, wordsFromIndexes);
  } 

 }
}


/* let mm = new MarkovMachine("a b c");

console.log(mm.makeText()) */

module.exports = {
MarkovMachine: MarkovMachine
};