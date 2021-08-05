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


// this function will determine if the guess is valid
// this function will determine if the guess is valid
function getValidLetterGuess() {
  //This helper function helps determine if the imput is a valid letter 
  function guessIsValid(letter) {
    //Use regex to determine if letter is in the alphabet and ignores case insesitivity.
    const validEntries = /[a-z]/i;
    //if the letter is valid and letters length is only 1
    if(validEntries.test(letter) && letter.length === 1) {
      //return that letter.
      return letter;
    } else {
      return false;
    }
  }
  // Declare a variable named letter with a falsy value to start
  let letter = "";
  //while the letter is a falsy value run the while loop
  while (!letter) {
    //Asking a question to get user's input
    let input = readline.question("Please enter your guess: ");
    if (guessIsValid(input)) {//checks if the imput id valid
      letter = input;
    } else {//if the imput is invalid.
      console.log("Please enter a valid letter");
    }
  }
  return letter.toLowerCase();
}



/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  const userInput = readline.question("Guess a letter: ");
  // This line of code will print out whatever is inputted in by the user.
  console.log("THE USER INPUTTED:", userInput);
}

run();
