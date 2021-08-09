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

/*
  This function runs your game. Everything you want to happen in your game should happen inside of here.
  Define other functions outside `run()` that have a single specific purpose, such as: getting user input; checking if a guess is correct.
  Then call these helper functions inside `run()`.
*/
function run() {
// Variable that stores the random word. The `word` variable will be a string.
const word = getRandomWord() // get random word

  // A (global scope) object that stores the current `state` of our application; Can access these from anywhere in the code.
  let state = {
    shouldKeepPlaying: true,
    // Put a random secret word into state
    secretWord: word, // the random word
    
    correctGuesses: [], // correctGuesses = []; // --> we have updated the state from empty array [] to ['p']
    wrongGuesses: [], // wrongGuesses = [];
    maxNumOfGuesses: 3, // stores how many guesses are left


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

  // HELPER FUNCTION #3 - reveal secret word function
  // function revealSecretWord() {
  //   // reveal secret word from current game
  //   setTimeout(() => {  console.log(`It was: ${word}`) }, 2000); // 2 sec delay
  // }

  /*
  While Loop that keeps the game running. `readline.question( `Write input question here` )` stops the execution of the program to ask for user input. The user enters whatever they want! The value the user inputs will be assigned to the variable `userInput`. After user hits the 'return' key, the rest of the code will run.
  */
  // while (state.shouldKeepPlaying) {
  while (state.maxNumOfGuesses > 0) {
    // Variable that stores the user input and is lowercased
    const userInput = readline.question("\nGuess a letter: ").toLowerCase();
    // if more than one character, do not push to array.
    // If only one character, push to array.
    if (userInput.length === 1) {
      // if guessedLetter is in guessedLetters array, do not push.
      if (state.guessedLetters.includes(userInput) === true) {
        console.log('You guessed this letter already.')
        // if the guessed letter is in the valid letters
      } else if (state.validLetters.includes(userInput) === true) {
        // if letter is new, push user input into the array of `guessedLetters`
        state.guessedLetters.push(userInput);
        // nested 'if' - if letter was correct:
        // if the guessed letter is in the word
        if (word.includes(userInput) === true) {
          console.log(`Great! You got a letter.`);
           // push wrong letter to `correctGuesses` array
           state.correctGuesses.push(userInput);
        } else {
          console.log(`that letter was wrong.`)
          // push wrong letter to `wrongGuesses` array
          state.wrongGuesses.push(userInput);
        }
      }

      // nested 'if' - does `userInput` match any letter in `validLetters` array?
      else if (state.validLetters.includes(userInput) === false) {
        // error message for symbols, numbers, etc.
        console.log(`This is not a valid letter of the alphabet. Try a letter.\n\n`);
        // make sure the first character isn't marked as incorrect
      }
    } 
    else {
    // error message
    console.log(`Input invalid - type in only one letter.\n\n`);
  }

  // declare variable to say how many guesses are left.
  // subtract number of `state.wrongGuesses.length` from the `maxNumGuesses` to see how many `guessesLeft`.
  let guessesLeft = state.maxNumOfGuesses - state.wrongGuesses.length;
  if (guessesLeft >= 0) {
    console.log(`You have ${guessesLeft} guesses remaining.`); // number of wrong guesses made
    // nested 'if' - for having zero guesses left, you lose. ends game.
    if (guessesLeft === 0) {
      console.log(`Sorry, You lost! ${guessesLeft} guesses are left. The word was: ${word}.`);
      // play again?
      playAgain();
    }
  }
    // ALL guesses the user has typed in so far, stored in array `guessedLetters`. Use .sort() to make it in alphabetical order
    // console.log("All guesses made:", state.guessedLetters.sort().join(', '));
    // log correct guesses array:
    console.log("Correct guesses made:", state.correctGuesses.sort().join(', '));
    // log wrong guesses array:
    console.log("Wrong guesses made:", state.wrongGuesses.sort().join(', '));
    
    // Call Helper Function #2 inside `run()` providing `userInput` as argument
    spliceUserInput(userInput);
    console.log(state.wordArr.join(' ')); // Output: a p p _ _

    // Once word has been guessed, stop the game.
    // Conditions for ending the game:
    if (state.wordArr.join('') === state.secretWord) {
      state.shouldKeepPlaying = false; // while loop for stops
      console.log(`\nYou guessed the word! It was ${word}.`);
      //  reveal secret word from current game
      //  revealSecretWord();
      // play again?
      playAgain();
    }
  }

  // WHAT SCOPE DOES THIS NEED TO BE IN???
  // Play again function - outside run() function
  function playAgain(){
    let userInput = readline.question("Would you like to play again? (Y or n) ").toLowerCase();
    // Conditional logic that handles where to stop the game
    if (userInput === "n" || userInput === "no") {
      // If the user doesn't enter "n" or "no"
      console.log(`game over. The word was ${word}.`);
      state.shouldKeepPlaying = false; // while loop for stops
    } 
    else {
        // Starts the game again - reset from beginning.
        run();
    }
  }
}
run();