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

function removeSpaces(guessBox) {
  for (let guess of guessBox) {
    guessBox = guessBox.replace(" ", "");
  }
  return guessBox;
}

function letterChecker(userInput) {
  if (
    userInput.toLowerCase() === "a" ||
    userInput.toLowerCase() === "b" ||
    userInput.toLowerCase() === "c" ||
    userInput.toLowerCase() === "d" ||
    userInput.toLowerCase() === "e" ||
    userInput.toLowerCase() === "f" ||
    userInput.toLowerCase() === "g" ||
    userInput.toLowerCase() === "h" ||
    userInput.toLowerCase() === "i" ||
    userInput.toLowerCase() === "j" ||
    userInput.toLowerCase() === "k" ||
    userInput.toLowerCase() === "l" ||
    userInput.toLowerCase() === "m" ||
    userInput.toLowerCase() === "n" ||
    userInput.toLowerCase() === "o" ||
    userInput.toLowerCase() === "p" ||
    userInput.toLowerCase() === "q" ||
    userInput.toLowerCase() === "r" ||
    userInput.toLowerCase() === "s" ||
    userInput.toLowerCase() === "t" ||
    userInput.toLowerCase() === "u" ||
    userInput.toLowerCase() === "v" ||
    userInput.toLowerCase() === "w" ||
    userInput.toLowerCase() === "x" ||
    userInput.toLowerCase() === "y" ||
    userInput.toLowerCase() === "z"
  ) {
    return true;
  }
}

function run() {
  const word = getRandomWord();

  let arr = [0];
  let guessBox = "";
  let guessLetters = "None";
  let remainingGuesses = word.length + 5;
  // create string of _
  for (let letter of word) {
    guessBox += "_ ";
  }
  console.log("Remaining Incorrect Guesses: " + remainingGuesses);
  console.log("Letters Guessed: " + guessLetters);
  console.log("word: " + guessBox);
  //console.log(word);

  for (let i = 0; i < arr.length; i++) {
    const userInput = readline.question("Guess a letter: ");
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      // put letter into _ array
      if (userInput.toLowerCase() === letter) {
        guessBox = guessBox.split("");
        guessBox.splice(i * 2, 1, letter);
        guessBox = guessBox.join("");
      }
    }
    // -1 if letter is wrong
    if (!word.includes(userInput.toLowerCase())) {
      remainingGuesses -= 1;
      //
      if (!letterChecker(userInput) || userInput.length >= 2) {
        remainingGuesses += 1;
      }
      // lose msg
      if (remainingGuesses === 0) {
        return console.log(`Word was ${word} \nLoser!`);
      }
    }
    // loop infinite
    console.log("THE USER INPUTTED:", userInput);
    if (removeSpaces(guessBox) !== word) {
      i = -1;
      // add letter to guessed
      if (guessLetters === "None") {
        guessLetters = userInput;
      } else {
        guessLetters = guessLetters + ", " + userInput;
      }
    }
    console.log("Remaining Incorrect Guesses: " + remainingGuesses);
    console.log("Letters Guessed: " + guessLetters);
    console.log("word: " + guessBox);
    if (!letterChecker(userInput) || userInput.length >= 2) {
      console.log("Invalid guess");
    }
  }
  // win msg
  console.log("Winner!");
}

run();
