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
  This function will run your game. Everything you want to happen in your game should happen inside of here.
  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.
*/
function run() {
  // An object that stores the current `state` of our application; `state` is in global scope. Can access these from anywhere in the code.
  // set up game state - secret word; correct guesses; wrong guesses; max num of wrong guesses.
  let state = {
    shouldKeepPlaying: true,
    // Put a random secret word into state
    secretWord: word, // the random word
    
    correctGuesses: [], // correctGuesses = []; // --> we have updated the state from empty array [] to ['p']
    wrongGuesses: [], // wrongGuesses = [];
    
    maxNumWrongGuesses: 8, // array, string? what is the data type of this? How are we going to use it to know if the game is won or lost?
    guessedLetters: [], // keep track of the guessed letters
    wordArr: [], // keep track of unknown blank letters
    validLetters: ['z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
  }
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
    After a user hits the 'return' key, the rest of the code will run.
  */
  // see what the random word is:
  console.log(word);

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

  // While Loop that keeps the game running
  while (state.shouldKeepPlaying) {
    // Variable that stores the user input and is lowercased
    const userInput = readline.question("Guess a letter: ").toLowerCase();
    // if more than one character, do not push to array.
    if (userInput.length === 1) {
      // push user input into the array of `guessedLetters`
      state.guessedLetters.push(userInput);

      // does `userInput` match the things in the `validLetters` array?
    } 
    if (state.validLetters.includes(userInput) === false) {
      // error message for symbols, numbers, etc.
      console.log(`This is not a valid letter of the alphabet.\n\n`);
    } else {
      // error message
      console.log(`Input invalid - type in only one letter.\n\n`);
    }

    // What the user has typed in so far, stored in array `guessedLetters`
    console.log("Correct guesses:", state.guessedLetters.join(', '));

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
    // TODO: Check if the guess is correct! Using our helper function. Pass the `userInput` into this helper function
    // let isCorrect = isGuessCorrect(userInput); // this value is going to be a boolean
  }
  // TODO: If the guess is correct, add it to `correctGuesses` 
}
run();
