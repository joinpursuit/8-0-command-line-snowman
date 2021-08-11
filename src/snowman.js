const readline = require("readline-sync");
const dictionary = require("./dictionary");
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}


function isInputValue(givenLetter, state){
  let errMsg =  "please enter a valid letter";

  if(givenLetter.length > 1){
    console.log("You entered more than one character, " + errMsg);
    return false;
  }
  if(!isNaN(givenLetter)){
    console.log("You entered a number, " + errMsg);
    return false;
  }
  if(state.guessedLetters.includes(givenLetter)){
    console.log("You have already guessed this value, " + errMsg);
    return false;
  }
  return true;
}

function printGameStatus(state){
  console.log(state.dashedWord, "\n");
  console.log("Guessed Letters: ", state.guessedLetters.split("").join(","), "\n");
  console.log(`You have ${state.numOfGuessesLeft} guesses remaining`);
}
function run() {
  // const word = getRandomWord();
  
  let state = {
    word: getRandomWord(),
    dashedWord: "",
    guessedLetters: "",
    numOfGuessesLeft: 6
  }

  while(state.numOfGuessesLeft > 0){
    // Create accumulator of handling isGivenLetterInWord, bool, false -- Decrement numOfguesses
    if(state.dashedWord.length > 0){
      state.dashedWord = "";
    }
    let solvedWord = true;
    for(let i = 0; i < state.word.length; i++){
      if(state.guessedLetters.includes(state.word[i])){
        state.dashedWord += state.word[i];
      } else {
        solvedWord = false;
        state.dashedWord += "_";
      }
      
      if(i !== state.word.length-1){
        state.dashedWord+= " ";
      }
    }
    if(solvedWord){
      console.log("Congrats you won!");
      return;
    }


    
    printGameStatus(state);
    const givenLetter = readline.question("Please enter your guess: ");
    
    let isValid = isInputValue(givenLetter, state);
    if(!isValid){
      continue;
    }
    
    state.guessedLetters += givenLetter;
  
    if(!state.word.includes(givenLetter)){
      state.numOfGuessesLeft--;
    }
  }
  console.log("Sorry you ran out guesses.The word was " + state.word)
} 


run();





