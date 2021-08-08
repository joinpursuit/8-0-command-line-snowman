/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");
/*
// Generate `randomWord` from `dictionary`
  This function returns a random word from the list in `src/dictionary.js`. Do not need to update/edit this function. Only need to call it from the `run()` function.
*/
// Set up code - Generate `randomWord` from `dictionary` (already given)
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index]; // returns a string
}
// Variable that stores the random word. The `word` variable will be a string.
const word = getRandomWord() // get random word

/*
  This function runs your game. Everything you want to happen in your game should happen inside of here.
  Define other functions outside `run()` that have a single specific purpose, such as: getting user input; checking if a guess is correct.
  Then call these helper functions inside `run()`.
*/
function run() {
  // A (global scope) object that stores the current `state` of our application; Can access these from anywhere in the code.
  let state = {
    shouldKeepPlaying: true,
    // Put a random secret word into state
    secretWord: word, // the random word
    
    correctGuesses: [], // correctGuesses = []; // --> we have updated the state from empty array [] to ['p']
    // wrongGuesses: [], // wrongGuesses = [];
    maxNumWrongGuesses: 8, // array, string? what is the data type of this? How are we going to use it to know if the game is won or lost?

    guessedLetters: [], // keep track of the guessed letters
    wordArr: [], // keep track of unknown blank letters
    validLetters: ['z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
  }
  // see what the random word is:
  console.log(`HINT: This is NOT the secret word: ${word}`);
  
  // HELPER FUNCTION #1: Fill word array with underscores
  function fillArrWithUnderscores() {
    for (let char of word) {
      state.wordArr.push("_");
    }
  }
  // Call helper function #1 inside of `run()`
  fillArrWithUnderscores()
  
  // HELPER FUNCTION #2 - this gets called inside of the while loop/gameLoop/run function, providing `userInput` as an argument
  function spliceUserInput(userInput) {
    for (let i = 0; i < word.length; i++) {  
      // loop over the word again
      // i changes dynamically every time. 
      if (word[i] === userInput) {
        state.wordArr.splice(i, 1, userInput);
      }
    }
  }
  /*
  While Loop that keeps the game running. `readline.question( `Write input question here` )` stops the execution of the program to ask for user input. The user enters whatever they want! The value the user inputs will be assigned to the variable `userInput`. After user hits the 'return' key, the rest of the code will run.
  */
  // TODO: Currently, there is no limit to the number of guesses. Set the `maxNumOfGuesses`. If number of guesses matches `maxNumOfGuesses` && `word` has not been found, EndOfGame message - `You did not guess the word in ${maxNumOfGuesses} guesses. game over.`
  // This would be if the `state.wrongGuesses.length` > `maxNumOfGuesses`
  while (state.shouldKeepPlaying) {
    // Variable that stores the user input and is lowercased
    const userInput = readline.question("Guess a letter: ").toLowerCase();
    // if more than one character, do not push to array.


    // How to get the correct letter into the empty `correctGuesses` array:
    // Only one letter at a time
    // if letter matches random `word`, continue to `correctGuesses` array.
      // if letter does not exist in `correctGuesses` array, add it.
      // if letter already exists in the `correctGuesses` array, don't add it.
    // else if letter doesn't match random `word`, continue to `wrongGuesses` array.
      // if letter does not exist in `wrongGuesses` array, add it.
      // if letter already exists in the `wrongGuesses` array, don't add it.


    // If only one character, push to array.
    if (userInput.length === 1) {
      // if guessedLetter is in guessedLetters array, do not push.
      if (state.guessedLetters.includes(userInput) === true) {
        console.log('You guessed this letter already.')
      } else {
        // if letter is new, push user input into the array of `guessedLetters`
        state.guessedLetters.push(userInput);
      }

      // nested 'if' - does `userInput` match any letter in `validLetters` array?
      if (state.validLetters.includes(userInput) === false) {
        // error message for symbols, numbers, etc.
        console.log(`This is not a valid letter of the alphabet.\n\n`);
      } else {
        // error message - incorrect letter.
        console.log(`Sorry, This letter is incorrect.\n\n`);
      }
    } 
    else {
    // error message
    console.log(`Input invalid - type in only one letter.\n\n`);
  }

    // ALL guesses the user has typed in so far, stored in array `guessedLetters`. Use .sort() to make it in alphabetical order
    console.log("All guesses made:", state.guessedLetters.sort().join(', '));

    // Call Helper Function #2 inside `run()` providing `userInput` as argument
    spliceUserInput(userInput);
    console.log(state.wordArr.join(' ')); // Output: a p p _ _

    // Keep track of wrong guesses
    // Tell how many guesses are remaining, based on number of wrong guesses
    // console.log(`You have ${} guesses remaining.`);
    // if (wrongGuesses.length > 8) {

    // }

    // Once word has been guessed, stop the game.
    // Conditions for ending the game:
    if (state.wordArr.join('') === state.secretWord) {
      state.shouldKeepPlaying = false; // while loop for stops
      console.log(`\nYou guessed the word!`);
      setTimeout(() => {  console.log(`It was: ${word}`) }, 2000); // 2 sec delay
    }
  }
}
run();
