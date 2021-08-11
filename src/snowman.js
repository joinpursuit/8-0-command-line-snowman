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

  let lines = "";

  // replaces word with underscores to show the user the length of the word they're guessing
  for (const eachLetter of newWordArr) {
    lines += "_";
  }

  // first user text block OBJECT
  const outputTextBlock = {
    remainingIncorrectGuesses: 7,
    lettersGuessed: "",
    word: lines.split(""),
  };

  // some variables that point object values, easier to use the variables
  let remainingGuesses = outputTextBlock.remainingIncorrectGuesses;
  let guessed = outputTextBlock.lettersGuessed;
  let hiddenLetters = outputTextBlock.word;

  while (remainingGuesses > 0 && word !== hiddenLetters.join("")) {
    // dynamic 3 block message user sees
    console.log(`\nRemaining Incorrect Guesses: ${remainingGuesses}\nLetters guessed: ${guessed}\nWord: ${hiddenLetters.join("")}\n`);
    
    // This line of code will print out whatever is inputted in by the user.
    let userInput = readline.question("Guess a letter: ");
    // lower cases any upper cased letters
    userInput = userInput.toLowerCase();
    console.log(`You typed: ${userInput}`);
    
    // edge cases or for user errors
    if (!alphabet.includes(userInput)) {
      console.log(`Invalid input: ${userInput}, please type a valid letter`);
      // logs the guessed letters.
    } else if (alphabet.includes(userInput)) {
      if (!guessed.includes(userInput)) {
        guessed += `${userInput}, `;
      } else if (guessed.includes(userInput)) {
        // user gets a message when they've guessed the same letter twice
        console.log(`You've already guessed ${userInput}, try again!`);
      }
      // deducts a guess when user guesses wrong.
      if (!newWordArr.includes(userInput)) {
        remainingGuesses = remainingGuesses - 1;
      }
      // logs the correct letters to word key value.
      for (const letter in newWordArr) {
        if (userInput === newWordArr[letter]) {
          hiddenLetters.splice(letter, 1, userInput);
        }
      }
    }

   // logs win if user won. logs lost if user lost
    if (remainingGuesses === 0) {
      console.log(`\nRemaining Incorrect Guesses: ${remainingGuesses}\nLetters guessed: ${guessed}\nWord: ${word}\nYou Lost!`);
      // takes user input 'y' for yes and 'n' for no, for the question 'Do you want to keep playing?'
      let userInput2 = readline.keyInYN(["\nDo you want to keep playing?",["Press 'y' for yes, 'n' for no"]])
      // if input is truthy: restart the game
      if (userInput2) {
        run();
      } else {
        // else: exit out out of the loop(defualt) and display the message below
        console.log('Alright, see ya next time!');
      }
    // checks if user has guessed all the letters
    } else if (word === hiddenLetters.join("")) {
      // when true: logs the message 'You Won!'
      console.log(
        `\nRemaining Incorrect Guesses: ${remainingGuesses}\nLetters guessed: ${guessed}\nWord: ${hiddenLetters.join(
          ""
        )}\nYay You Won🎉!`
      );
    }
  }
}
// function invokation 
run();