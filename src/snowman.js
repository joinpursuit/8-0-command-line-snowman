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
function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  // declare 'alphabet' and assign an array of string letters, for the user input
  const alphabet = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];

  // split 'word' into an array of string of letters, get the length
  const newWordArr = word.split("");
  console.log(newWordArr);
  const newWordLength = newWordArr.length;

  let lines = "";

  for (const eachLetter of newWordArr) {
    lines += "_";
  }

  // first user text block OBJECT
  const outputTextBlock = {
    remainingIncorrectGuesses: 7,
    lettersGuessed: "None",
    word: `${lines}`,
  };

  let remainingGuesses = outputTextBlock.remainingIncorrectGuesses;
  let guessed = outputTextBlock.lettersGuessed;
  let hiddenLetters = outputTextBlock.word;

  console.log(
    `\nRemaining Incorrect Guesses: ${remainingGuesses.toFixed()}\nLetters guessed: ${guessed}\nWord: ${hiddenLetters}\n`
  );

  // This line of code will print out whatever is inputted in by the user.
  let userInput = readline.question("Guess a letter: ");
  // lower cases any upper cased letters
  userInput = userInput.toLowerCase();


  // edge cases or for user errors
  alphabet.map((letter) =>
    alphabet.includes(userInput)
      ? (result = `THE USER INPUTTED: ${userInput}`)
      : (result = `Invalid input: ${userInput}, please type a valid letter`)
  );
  console.log(result);
}

run();