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

/**
 * setting up game state
 * === STATE ===
 * What data do we need to access or update?
 * - secret word
 * -correct guesses
 * -wrong guesses
 * -max number of wrong guesses before losing the game
 *
 * What do we with that data?
 * === HELPER FUNCTIONS THAT USE STATE ===
 * -put a random secret word into state
 * -check if a guess is correct
 * -add a correct guess to the list
 * -check if the game is won
 * -...
 */

/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
// let secretWord = getRandomWord();
// let wrongGuesses = [];
// let correctGuesses = [];

// //HELPER FUNCTIONS
// //TODO: Need a diiferent secret word every game

// console.log(isGuessCorrect("a"));
// // //TODO: How to keep previous guesses in memory
// function addCorrectGuessToList(guess) {
//   correctGuesses.push(guess);
//   return correctGuesses;
// }

// console.log(addCorrectGuessToList("p"));
// console.log(addCorrectGuessToList("l"));

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};
/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/

const guesses = [];
const word = getRandomWord();
let incorrectGuesses = 8;
let validLetters = [
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

function run() {
  const space = "\n";
  console.log(
    "⛄ 🧟 S N O W M A N  G A M E 🧟 ⛄ " +
      space +
      space +
      "The game begins when you enter a letter you believe is in the mystery word" +
      space +
      "You have 8 chances to guess the complete word.. but be careful you may awaken the Snowman monster!" +
      space +
      "The game ends when you have correctly guessed the mystery word or you have run out of incorrect guesses" +
      space +
      "GOOD LUCK!!🌟🌟🌟"
  );
  let repeatedString = "";
  let i = 0;
  while (i < word.length) {
    repeatedString += "_";
    i++;
  }
  console.log(repeatedString);
  console.log(`${space}A ${word.length} Letter Word${space}`);

  while (repeatedString.includes("_") && incorrectGuesses > 0) {
    console.log(
      ` Word: ${repeatedString.split("").join(" ")} 
        ${space}Remaining Incorrect Guesses: ${incorrectGuesses}${space}${space}Letters Guessed: ${guesses}${space}
        `
    );

    const guess = readline.question("Guess a letter: ");
    if (!validLetters.includes(guess)) {
      console.log(
        `${space}Opps! Please enter one lower-case letter...${space}`
      );
      continue; // sends the user back to the game start (breaking out of the loop) after they enter a (number, multiple letters, etc.)
    }
    if (guesses.includes(guess)) {
      console.log(
        `${space}You have already guessed that letter. Try Again${space}`
      );
      continue;
    }
    guesses.push(guess);
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        repeatedString = repeatedString.replaceAt(i, guess);
      }
      continue;
    }
    if (word.includes(guess)) {
      console.log(space + "You got it! Keep up the good work!" + space);
    }
    if (!word.includes(guess)) {
      incorrectGuesses -= 1;
      console.log(`${space}There is no ${guess}, try again${space}`);
    }

    //below signals when game ends
    if (incorrectGuesses === 0) {
      // This line of code gets a random word. The `word` variable will be a string.
      //const word = getRandomWord();
      /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
      // This line of code will print out whatever is inputted in by the user.
      console.log(
        `${space}Oh no, It's alive!! ⛄ 🧟  ${space}${space}You are out of guesses \n
      The correct word was ${word}${space}`
      );
    }
    if (!repeatedString.includes("_")) {
      console.log(`${space}Snow-tastic!! You're A Winner! 🎊  ${space}`);
    }
  }
}
run();
