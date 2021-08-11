/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");

//This function returns a valid letter guess
function getValidLetterGuess() {
  //This helper function is used to determine if letter guess is valid
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
    //program will stop to get user input
    let input = readline.question("Guess a letter: ");
    if (guessIsValid(input)) {
      letter = input;
    } else {
      console.log("Please enter a valid letter");
    }
  }
  return letter.toLowerCase();
}

module.exports = getValidLetterGuess;
