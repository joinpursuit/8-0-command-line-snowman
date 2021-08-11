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
//

function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();

  let incorrectGuesses = word.length + 1;
  let lettersGuessed = ["None"];
  let theBlanks = "";
  let winningMsg = "Congratulations, You Won!";
  let losingMsg = "Game Over!";
  let validEntries = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let invalidMsg = "Please enter a lowercase letter";

  //assign underscores to a var called theBlanks to hide secret word
  for (let i = 0; i < word.length; i++) {
    theBlanks += "_ ";
  }
  for (let i = word.length - 1; i < word.length; i++) {
    console.log("Remaining Incorrect Guesses: " + incorrectGuesses);
    console.log("Letters Guessed: " + lettersGuessed);
    console.log("Word: " + theBlanks);
    let userInput = readline.question("Pick a letter: ");
    console.log("\n");
    userInput.toLowerCase();

    if (userInput) {
      if (validEntries.includes(userInput)) {
        lettersGuessed.push(" " + userInput);
      } else {
        incorrectGuesses++;
        console.log(invalidMsg);
      }
      //if "None" is present after first push, remove with shift method
      if (lettersGuessed.includes("None")) {
        lettersGuessed.shift();
      }
    }
    //loop through word.length to check if userInput is correct or not and modify theBlanks appropriately
    for (let i = 0; i < word.length; i++) {
      //if userInput matches an element witihin word.length, replace theBlanks with i
      if (userInput === word[i]) {
        //adds spaces in between characters
        theBlanks = theBlanks.split("");
        //replace every other element of string with userInput
        theBlanks.splice(i * 2, 1, userInput);
        //returns concatenated string
        theBlanks = theBlanks.join("");
      }
    }
    if (!word.includes(userInput)) {
      incorrectGuesses--;
    }
    if (incorrectGuesses === 0) {
      console.log("Remaining Incorrect Guesses: " + incorrectGuesses);
      console.log("Letters Guessed: " + lettersGuessed);
      console.log("Word: " + theBlanks);
      return console.log(losingMsg + ` The Secret Word was: ` + word);
    }
    /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
    After a user hits the 'return' key, the rest of the code will run.
  */

    // This line of code will print out whatever is inputted in by the user.
    if (theBlanks.includes("_")) {
      i--;
    } else {
      return console.log(winningMsg);
    }
  }
}

run();

//how do I get the code to keep running
