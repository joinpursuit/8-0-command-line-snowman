//node-fetch to make get http call
const fetch = require("node-fetch");
//dotenv to retrive api key from local machine
require("dotenv").config();
// add colors
const chalk = require("chalk");

/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/

const dictionary = require("./dictionary");

// This line of code gets a random word. The `word` variable will be a string.
const word = getRandomWord();
//console.log(word);

// console.log(the first sysnomyn's short definition of the random word)
async function apiData() {
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data[0].shortdef;
}
/*
fetch(
    `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.API_KEY}`
  );
  .then(res=> res.json())
  .then(json => {console.log(json)})

*/

/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

// How many times user is allowed to guess incorrect guesses, optional terminal argument
let numOfGuesses = Number(process.argv[2]) ? process.argv[2] : 5;

// An array of all the letters the user guesses (incorrect and correct)
let lettersGuessed = [];

// Check guesses and return dash format of correct guesses and missing letters
function getGuessedWords() {
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
  dash += chalk.blue.bold(`\t(${word.length.toString()} letter word)`);
  return dash;
}

// Function to validate and ask user if they would like to try their luck game
function tryYourluck(responseData) {
  let userInput = readline.question(
    "Would you like to try your luck and use a hint to guess the entire word? [Y/N] \n"
  );
  let validResponse = ["y", "yes"];
  if (validResponse.includes(userInput.toLowerCase())) {
    console.log(
      "\nYou are testing your luck, here is the hint followed by the word length: \n"
    );
    console.log(chalk.yellow.bold(responseData + "\n"));
    console.log(getGuessedWords(), "\n");

    let userInput = readline.question("Enter guess: ");
    if (userInput.toLowerCase() === word) {
      console.log("\nCongrats your the best!");
      return true;
    } else {
      console.log("You failed! Now try and play the game. \n");
      return false;
    }
  } else {
    return false;
  }
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
async function run() {
  console.log("Welcome to the SNOWMAN Game!\n");
  let responseData = await apiData();
  let proced = tryYourluck(responseData);

  if (!proced) {
    console.log(`\nWord: ${getGuessedWords()}\n`);
    // while loop to run for as many guesses allowed or if the correct answer is found
    while (numOfGuesses > 0 && !answerValidation()) {
      // welcome console.logs()
      console.log(`Letters Guessed: ${lettersGuessed.join()}\n`);
      console.log(`Remaining Incorrect Guesses: ${numOfGuesses}`);
      // validate input
      userInputValidation();
      // call  function to provide dash format
      console.log(`\nWord: ${getGuessedWords()}\n`);
    }

    // once loop terminates display winner or loser statements
    if (answerValidation()) {
      console.log(
        chalk.green(
          `Congratulations, you won! You guessed ${word} correctly!) \n`
        )
      );
    } else {
      console.log(
        chalk.red(`Sorry, you ran out of guesses. The word was ${word}. =(\n`)
      );
    }
  }
}

run();
