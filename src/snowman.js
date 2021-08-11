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

/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
const word = getRandomWord();
//global variables
let guessedWord = []; // stored the guessed letters forming the secret word
let guessedLetter = ""; // user inputted letters guessed
let WordLength = word.length + 3; // counter for chances to guess letters correctly
let alreadyGuessedLetters = []; //stores letters already guessed
//determines a winner or a loser

//determines if letter guessed is listed in alreadyGuessedLetters array
    //if letter is already guessed, error msg is logged
    //otherwise the guessed letter is listed in alreadyGuessedLetters array

//As long as guessedWord has an underscore you'll have a change to play the game
  //the while loop executes lines of codes in it's code block until the game ends
  //executes when user input a letter already inputted
    
  //checks if guessed letter is an empty string
    //if no input is given the user is asked for an input
    
  // checks if the input is something other than a letter
    //searches for the user's guessed input by iterating through the letters of the
    //random word given, if a match is found, it assigns(replaces the underscore '_') it to the corresponding index of
    //if user's guess is incorrect, the chance of play is decremented by 1 after each input

  //populates the guessedWord array with underscores, with the same length as the random word
    //As long as the chance to play is greater than zero, game is played
    //Invoking playGame function starts the game
    playGame();

run();
