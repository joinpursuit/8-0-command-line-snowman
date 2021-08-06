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

function gameIntro() {
  const userInput = readline.question("Do you want to play a Snowman? [Y][N] \n").toUpperCase();
  switch(userInput) {
    case "Y" : 
    case "YES" : run(); break;
    case "N" : 
    case "NO" : console.log("You have now exit the game!"); break;
    default : console.log("That is not one of the options"); gameIntro(); break;
  }
}

let status = {
  dashArr: [],
  lettersGuessArr: [],
  guessRemaining: null,
  gameContinue: true,
}


gameIntro();