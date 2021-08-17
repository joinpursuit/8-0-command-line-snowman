/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

/**
 * setting up game state
 * What data do we need to access or update?
 * - secret word 
 * - correct guesses
 * - wrong guesses
 * - max num of wrong data
 * ==HELPER FUNCTIONS THAT USE STATE==
 * -put a random secret word into state
 * -check if a guess is correct
 * -add a correct guess to the list
 * -check if the game is won
 * 
 */


// let secretWord = getRandomWord();
// let correctGuesses = [];
// let incorrectGuesses = [];
// // HELPER FUNCTIONS
// //Need a different secret word each game
// function isGuessCorrect(guess){
//   return secretWord.includes(guess);
// }

// console.log(isGuessCorrect("a"));

//How do we keep previous guesses in memory aka state
// function addCorrectGuessToList(guess){
//   correctGuesses.push(guess);
//     return correctGuesses;
// }
// //How do we keep wrong guess in memory
// function addIncorrectGuessesToList(guess){
//   incorrectGuesses.push(guess);
//   return incorrectGuesses;
  
// }

//console.log(addCorrectGuessToList('p')); //['p']
//console.log(addCorrectGuessToList('l')); //['l']

// function isNotALetter(){
//   if (typeof userInput !== 'string' || userInput.length >1){
//     return "Please enter a letter."
//   } ;
// }

// console.log(isNotALetter("word"))


/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}


function run() {
  
  // This line of code gets a random word. The `word` variable will be a string.
  //const word = getRandomWord();

  let state = {
    word : getRandomWord(),
    dashedWord:"",
    guessedLetters: "",
    numOfGuessesLeft: 6,

  }

  while(state.numOfGuessesLeft > 0){
    // Accumulator pattern for isGivenLetter in word, bool, false -- Decrement numofGuesses
    if(state.dashedWord.length > 0){
      state.dashedWord = "";
    }
    let solvedWord = true;

    for(let i = 0; i < state.word.length; i++){
      if(state.guessedLetters.includes(state.word[i])){
        state.dashedWord += state.word[i];
      }else {
        solvedWord = false;
        state.dashedWord += "_";
      }

      if(i !== state.word.length-1){
        state.dashedWord += " ";
      }
    }
    if(solvedWord){
      console.log("Yay you won!" );
      return;
    }

    console.log(state.dashedWord, "\n");
    console.log("Guessed Letters: ", state.guessedLetters, "\n");
    console.log(`You have ${state.numOfGuessesLeft} guesses remaining`);
    const givenLetter = readline.question("Please enter your guess: ");
    if(!isNaN(givenLetter) || givenLetter.length > 1 || state.guessedLetters.includes(givenLetter)){
      console.log("Please enter a valid letter")
      continue;
    }
    state.guessedLetters += givenLetter;

    
   
    if(!state.word.includes(givenLetter)){
    state.numOfGuessesLeft--;
    }
  }
//Outside of the while loop once guesses = 0 return this message is word was not solved.
console.log("Sorry you ran out of guesses. The word was " + state.word)

}

run();
