/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

//This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

//this function will get a valid letter guess
function getValidLetterGuess() {
  //this helper function is used to determine if letter guess is valid
  function guessIsValid(letter) {
    //use regex to determine if letter is in the alphabet and ignore case sensitivty
    const validEntries = /[a-z]/i;
    //if the letter is in the alphabet and the length of the letter is 1
    if (validEntries.test(letter) && letter.length === 1) {
      return letter;
    } else {
      return false;
    }
  }
  //declare a variable named letter and assign it a falsy value to start off
  let letter = "";
  //while the letter is falsy
  while (!letter) {
    //get user input
    let input = readline.question("Please enter your guess: ");
    if (guessIsValid(input)) {
      letter = input;
    } else {
      console.log("Please enter a valid letter");
    }
  }
  return letter.toLowerCase();
}

/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  const userInput = readline.question("Guess a letter: ");
  // This line of code will print out whatever is inputted in by the user.
  console.log("THE USER INPUTTED:", userInput);
}

run();
