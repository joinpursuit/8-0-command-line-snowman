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

// ------------------------------------------------------------------------------------
function checkGuess (randomWord, guess) { // Check if input is correct or not
  if (randomWord.includes(guess)) {
    return true
  } else {
    return false
  }
}

function charReplacer (guess, word, letterDisplay) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      if (word[i] === guess.toLowerCase()){
        letterDisplay.splice(i,1,"\033[1;34m" + `${guess}` + "\033[1;33m")
      }
    }
  }
}
// ------------------------------------------------------------------------------------



/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function run() {

  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();

  let listOfGuessedLetters = [];


  let remainingChances = word.length + 1

  function convertToUnderScore (word) { //Keeping inside the run function so it resets everytime a player starts a new game
    for (let characther of word) {
      characther = "_"
      letterDisplay.push(characther)
      }
    }
    convertToUnderScore (word)



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
