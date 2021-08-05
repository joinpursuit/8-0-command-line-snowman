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

// This line of code gets a random word. The `word` variable will be a string.
const word = getRandomWord();

// How many times user is allowed to guess incorrect guesses
let numOfGuesses = 7;

// An array of all the letters the user guesses (incorrect and correct)
let lettersGuessed = [];

// Check guesses and return dash format of correct guesses and missing letters
function getGuessedWords(word, lettersGuessed) {
  let dash = "";
  for (let letter of word) {
    if (lettersGuessed.includes(letter)) {
      // add letters that user correctly guesses.
      dash += letter;
      dash += " ";
    } else {
      // maintain dashes for letters not yet guessed.
      dash += "_";
      dash += " ";
    }
  }
  return dash;
}

// Validate the user input. Re-ask question if input is not a single letter without penatly.
function userInputValidation() {
  let userInput = readline.question("Please guess a letter: ");
  // convert to lowercase for user, giving some flexibility
  userInput = userInput.toLowerCase();
  if (
    userInput.length > 1 ||
    !"abcdefghijklmnopqrstuvwxyz".includes(userInput)
  ) {
    console.log("Please enter a valid letter\n");
    userInputValidation();
  } else {
    // update the global variable lettersGuessed that holds all user input (valid and invalid)
    if (lettersGuessed.includes(userInput)) {
      console.log(`${userInput} has already been inputed. \n`);
      userInputValidation();
    } else {
      lettersGuessed.push(userInput);
      // reduce while loop conditional penalizing user for incorrect guesses.
      if (!word.includes(userInput)) {
        numOfGuesses--;
      }
    }
  }
}
// function to determine final result, if all letters are guessed correctly. Return Boolean.
function answerValidation() {
  let bol = true;
  for (let letter of word) {
    if (!lettersGuessed.includes(letter)) {
      return false;
    }
  }
  return bol;
}

console.log("\n------------------\n");

//
function run() {
  // while loop to run for as many guesses allowed or if the correct answer is found
  while (numOfGuesses > 0 && !answerValidation()) {
    // welcome console.logs()
    console.log(`Letters Guessed: ${lettersGuessed.join()}\n`);
    console.log(`Remaining Incorrect Guesses: ${numOfGuesses}`);
    // validate input
    userInputValidation();
    // call  function to provide dash format
    console.log(`\nWord: ${getGuessedWords(word, lettersGuessed)}\n`);
  }

  // once loop terminates display winner or loser statements
  if (answerValidation()) {
    console.log(`Congratulations, you won! You guessed ${word} correctly! \n`);
  } else {
    console.log(`Sorry, you ran out of guesses. The word was ${word}. =(\n`);
  }
}

run();
