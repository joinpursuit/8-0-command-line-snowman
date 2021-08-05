/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

// importing valid inputs
const validInput = require("./validinput")
// New helper function

function validInputCheck (letter) {
  return validInput.includes(letter.toLowerCase());
}


/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function run() {
  // This line of code gets a random word. The `word` variable will be a string.

  // declare a variable for our random work
  const secretWord = getRandomWord();
  // declare variable for our incorrectGuess, set to length of secretWord.
  // declare a variable for already guessed -- set to empty array.
  // declare variable for displayWord -- set to empty array.
  // use a loop to push "_" based on secretWord.length.
  // console.log "remaining Incorrect Guesses: 7, Letters Guessed: None, Word: _ _ _"
  // Ask for an input = readline.question("Guess a letter: ");

  // check if input.toLowerCase() isn't valid with helper function.
  // if it isn't -- ask user to input valid input.
  // check if input was already guess
      //if it was, tell the user, and don't penalize them
  
  
  // loop through our secretWord
    //in loop, check if input = currentletter
    // if it is, change the value of displayedWord[i], to current letter
    // after the loop, check if secretWord includes input
      // if it does, incorrect Guess -= 0;
      // if it isn't, incorrect guess -= 1;
    //
  
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  const userInput = readline.question("Guess a letter: ");
  // This line of code will print out whatever is inputted in by the user.
  console.log("THE USER INPUTTED:", userInput);

  // The game is a loop.
  // Loop ends when incorrect guess is 0 or the random word doesn't include "_".
  // Set guesses to length of word.
  // Set random word to array of "_"
  // Set already Guessed to empty array.
  // after user input guesses, check input validity
  // check if character is in our word
  // replace underscore with character found with the array index.
  // decrease guess count if incorrect guess is made by one && add incorrect input to already guessed array.
  // check if input has already been given.
  // check for incorrect guess allowence = 0 triggers -- you lose







}

run();
